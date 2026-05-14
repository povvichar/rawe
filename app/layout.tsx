import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAWE — Natural Glow, Made for Your Skin",
  description:
    "RAWE is a creamy blush stick made for Cambodian skin tones. Blends in 3 seconds. Lasts up to 8 hours.",
  openGraph: {
    title: "RAWE — Natural Glow, Made for Your Skin",
    description:
      "A creamy blush that blends effortlessly and flatters every Cambodian skin tone.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
