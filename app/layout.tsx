import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Text, Geist_Mono } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Nav } from "@/components/nav";
import { PromoBanner } from "@/components/promo-banner";
import { CartProvider } from "@/components/cart-provider";
import { CartSidebar } from "@/components/cart-sidebar";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const dmSerif = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AngelDust",
  description: "Makeup and stationery shop",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <TooltipProvider>
                <PromoBanner />
                <Header />
                <Nav />
                {children}
                <CartSidebar />
              </TooltipProvider>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
