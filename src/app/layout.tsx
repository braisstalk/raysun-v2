import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.raysunpharma.com'),
  title: {
    default: "Raysun Biopharma - GMP Certified Pharmaceutical Manufacturer",
    template: "%s | Raysun Biopharma"
  },
  description: "GMP-certified pharmaceutical manufacturer specializing in softgels, tablets, capsules, creams, and injections. Serving Southeast Asia and global markets with quality medicines.",
};

// Root layout passes children through. The actual <html>/<body> is owned by
// either app/[locale]/layout.tsx (so lang/dir reflect the active locale) or by
// app/not-found.tsx for the global 404 page.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
