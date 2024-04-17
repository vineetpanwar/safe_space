import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safe Space",
  description: "A Mental Health Wellness Chatbot"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          {/* Add your favicon link tag */}
          <link rel="icon" href="favicon.ico" />
        </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
