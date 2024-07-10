import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata = {
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
      <body className="bg-gray-50 text-black relative">{children}</body>
    </html>
  );
}
