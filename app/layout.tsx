import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/AuthButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-gray-50 text-black">
        <nav className="flex w-full border-b border-gray-300 justify-between max-w-7xl mx-auto items-center px-4 py-2">
          <div className="flex items-center">
            <a href="/" className="font-bold">
              Tesla Battery Layout Builder
            </a>
          </div>
          <div>{isSupabaseConnected && <AuthButton />}</div>
        </nav>
        <main className="min-h-screen flex flex-col items-center max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
