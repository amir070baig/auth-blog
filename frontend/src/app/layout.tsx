import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Auth Blog",
  description: "A simple blog with auth & roles",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-3xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
