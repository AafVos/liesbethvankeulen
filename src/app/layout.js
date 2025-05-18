import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Liesbeth van Keulen",
  description: "Portfolio of Liesbeth van Keulen",
  icons: {
    icon: '/lvk-favicon.svg',
    shortcut: '/lvk-favicon.svg',
    apple: '/lvk-favicon.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col relative">
          <main className="flex-grow relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
