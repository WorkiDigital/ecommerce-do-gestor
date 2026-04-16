import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const BASE_URL = "https://trafegohub.workidigital.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TrafegoHub — Encontre Gestores de Tráfego Verificados",
    template: "%s | TrafegoHub",
  },
  description:
    "A maior plataforma de conexão entre empresas e gestores de tráfego pago do Brasil. Avaliações reais, portfólios verificados e contato direto via WhatsApp.",
  keywords: [
    "gestor de tráfego",
    "tráfego pago",
    "marketing digital",
    "contratar gestor de tráfego",
    "gestor de facebook ads",
    "gestor de google ads",
    "trafegohub",
    "anúncios online",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TrafegoHub — Encontre Gestores de Tráfego Verificados",
    description:
      "Conecte-se com os melhores profissionais de tráfego pago do Brasil. Sem intermediários, contato direto no WhatsApp.",
    type: "website",
    locale: "pt_BR",
    siteName: "TrafegoHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TrafegoHub — Marketplace de Gestores de Tráfego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrafegoHub — Encontre Gestores de Tráfego Verificados",
    description: "Conecte-se com os melhores profissionais de tráfego pago do Brasil. Contato direto via WhatsApp.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dados Estruturados Globais
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TrafegoHub",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "description": "Marketplace de Gestores de Tráfego Pago com avaliações verificadas.",
    "sameAs": [
      "https://instagram.com/workidigital",
      "https://facebook.com/workidigital"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TrafegoHub",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/gestores?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
