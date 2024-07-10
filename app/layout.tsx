import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Image from "next/image";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PowerPlan",
  description:
    "Mockup the build of materials and site layout of an Industrial Energy Battery site.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-gray-50 text-black relative">
        {/* use the megapack hero as the background image  */}

        <Image
          src="/Tesla-Megapack-hero.webp"
          alt="Tesla Megapack"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 -z-10 bg-cover bg-center"
        />

        <main className="min-h-screen flex flex-col items-center max-w-2xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
