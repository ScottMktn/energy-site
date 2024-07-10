import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";

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
        <nav className="flex w-full border-b border-gray-300 justify-between max-w-7xl mx-auto items-center px-4 py-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/image.png"
              alt="PowerPlan Logo"
              width={16}
              height={16}
            />
            <a href="/" className="font-bold">
              PowerPlan
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