import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/shared/AuthButton";

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
    <>
      <nav className="flex w-full border-b border-gray-300 justify-between max-w-7xl mx-auto items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <Image src="/image.png" alt="PowerPlan Logo" width={16} height={16} />
          <a href="/" className="font-bold">
            PowerPlan
          </a>
        </div>
        <div>{isSupabaseConnected && <AuthButton />}</div>
      </nav>
      <main className="min-h-screen flex flex-col items-center max-w-7xl mx-auto">
        {children}
      </main>
    </>
  );
}
