import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Supabase Ticket Demo",
  description: "Supabase Ticketing for community meetup powered by CraftGraph",
  openGraph: {
    title: "Supabase Ticket Demo",
    description:
      "Supabase Ticketing for community meetup powered by CraftGraph",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Supabase Community Demo powered by CraftGraph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supabase Ticket Demo",
    description:
      "Supabase Ticketing for community meetup powered by CraftGraph",
    images: ["/og-image.png"], // Updated to match OpenGraph image
  },
};

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} antialiased`}>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
