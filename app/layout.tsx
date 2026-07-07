import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentPact — Typed, Routed, Verifiable, Payable Intelligence for Agents",
  description:
    "The agent economy suite from Island Development Crew: open AGIF spec, intent routing, cryptographic provenance, and a live HTTP 402 endpoint agents can pay for.",
  metadataBase: new URL("https://agentpact.islanddevcrew.app"),
  alternates: { canonical: "https://agentpact.islanddevcrew.app" },
  openGraph: {
    title: "AgentPact — Typed, Routed, Verifiable, Payable Intelligence for Agents",
    description:
      "The agent economy suite from Island Development Crew: open AGIF spec, intent routing, cryptographic provenance, and a live HTTP 402 endpoint agents can pay for.",
    url: "https://agentpact.islanddevcrew.app",
    siteName: "AgentPact",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
