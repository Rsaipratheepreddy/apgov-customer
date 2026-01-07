import type { Metadata } from "next";
import { Inter, Anek_Telugu } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anekTelugu = Anek_Telugu({
  variable: "--font-anek-telugu",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Drone Mart - AP Govt",
  description: "Transforming Agriculture & Surveillance through Technology",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Drone Mart",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anekTelugu.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
