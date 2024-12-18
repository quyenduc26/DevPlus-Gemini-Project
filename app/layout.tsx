// app/layout.tsx
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js 15 SPA Layout",
  description: "Sidebar stays fixed while content changes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <div className="bg-gray-900 text-white">
              <AppSidebar />
            </div>
            <div className="flex overflow-y-auto w-full">
              <SidebarTrigger />
              <main>{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
