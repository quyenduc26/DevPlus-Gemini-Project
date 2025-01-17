import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'FloraLens - AI',
  description: 'FloraLens - AI'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-100">
        <SessionProvider>
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <div className="bg-gray-900 text-white">
                <AppSidebar />
              </div>
              <div className="flex flex-col flex-grow overflow-hidden">
                <header className="bg-white shadow-sm p-4 flex items-center">
                  <SidebarTrigger className="mr-4" />
                  <h1 className="text-xl font-semibold text-gray-800">
                    DevPlus-Gemini-Project
                  </h1>
                </header>
                <main className="flex-grow overflow-auto p-6">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
