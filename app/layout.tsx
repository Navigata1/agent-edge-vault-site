import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Edge Vault | Intelligence Feeds for Autonomous Agents",
  description:
    "Premium intelligence feeds — market signals, competitor data, and curated intel streams engineered for autonomous agent consumption. Part of the Sentinel suite by Island Development Crew.",
  keywords: [
    "agent intelligence",
    "market signals",
    "AI data feeds",
    "competitor intelligence",
    "autonomous agents",
    "Island Development Crew",
    "Sentinel suite",
    "machine-readable intelligence",
  ],
  authors: [{ name: "Island Development Crew LLC" }],
  creator: "Island Development Crew LLC",
  publisher: "Island Development Crew LLC",
  metadataBase: new URL("https://vault.agentedge.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vault.agentedge.io",
    title: "Agent Edge Vault | Intelligence Feeds for Autonomous Agents",
    description:
      "Premium intelligence feeds engineered for autonomous agent consumption. Part of the Sentinel Intelligence & Data Systems suite.",
    siteName: "Agent Edge Vault",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agent Edge Vault — Intelligence Feeds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Edge Vault | Intelligence Feeds for Autonomous Agents",
    description:
      "Premium intelligence feeds — market signals, competitor data, curated for agent consumption.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0a0a0f] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
