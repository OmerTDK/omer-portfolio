import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://omerzaman.com"),
  title: "Omer Zaman | Analytics Engineer",
  description:
    "Analytics engineer specializing in data engineering, data science, and data analytics workflows. Building scalable data pipelines with BigQuery, dbt, and Python.",
  keywords: [
    "analytics engineer",
    "data engineering",
    "BigQuery",
    "dbt",
    "Python",
    "data pipelines",
  ],
  authors: [{ name: "Omer Zaman" }],
  openGraph: {
    title: "Omer Zaman | Analytics Engineer",
    description: "Building data pipelines that scale",
    url: "https://omerzaman.com",
    siteName: "Omer Zaman",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Omer Zaman",
              jobTitle: "Analytics Engineer",
              url: "https://omerzaman.com",
              sameAs: [
                "https://github.com/OmerTDK",
                "https://linkedin.com/in/omerzaman",
              ],
            }),
          }}
        />
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[#60a5fa] focus:px-4 focus:py-2 focus:text-[#020617]"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
