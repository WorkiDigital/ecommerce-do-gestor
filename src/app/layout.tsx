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
    default: "TrafegoHub — Encontre o gestor de tráfego certo em 2 minutos",
    template: "%s | TrafegoHub",
  },
  description:
    "Marketplace que conecta empresas a gestores de tráfego pago com avaliações verificadas, portfólio real e contato direto no WhatsApp.",
  keywords: [
    "gestor de tráfego",
    "tráfego pago",
    "marketing digital",
    "agência de tráfego",
    "Meta Ads",
    "Google Ads",
    "marketplace",
    "contratar gestor",
  ],
  alternates: {
    canonical: "./",
  },
  verification: {
    // Espaço para o código do Google Search Console
    google: "GOOGLE_VERIFICATION_CODE", 
  },
  openGraph: {
    title: "TrafegoHub — Encontre o gestor de tráfego certo em 2 minutos",
    description:
      "Avaliações verificadas, portfólio real e contato direto via WhatsApp. Sem taxa, sem burocracia.",
    type: "website",
    locale: "pt_BR",
    siteName: "TrafegoHub",
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrafegoHub — Encontre o gestor de tráfego certo em 2 minutos",
    description: "Avaliações verificadas, portfólio real e contato direto via WhatsApp.",
    creator: "@workidigital",
    images: [`${BASE_URL}/og-image.png`],
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
