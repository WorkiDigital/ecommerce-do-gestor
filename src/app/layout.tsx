import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://trafegohub.workidigital.tech"),
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
  ],
  openGraph: {
    title: "TrafegoHub — Encontre o gestor de tráfego certo em 2 minutos",
    description:
      "Avaliações verificadas, portfólio real e contato direto via WhatsApp. Sem taxa, sem burocracia.",
    type: "website",
    locale: "pt_BR",
    siteName: "TrafegoHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrafegoHub — Encontre o gestor de tráfego certo em 2 minutos",
    description: "Avaliações verificadas, portfólio real e contato direto via WhatsApp.",
    creator: "@workidigital",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
