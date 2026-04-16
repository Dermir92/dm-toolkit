import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { WorkspaceProvider } from '@/context/WorkspaceContext';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DM Toolkit — Generate. Prep. Reuse.',
  description:
    'A modular assistant for Dungeon Masters. Generate campaigns, sessions, NPCs, encounters, and loot — then save and reuse what matters.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body
        className="min-h-full flex flex-col text-zinc-100 antialiased"
        style={{
          backgroundImage: 'url("/dnd back img.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <WorkspaceProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-600">
            DM Toolkit — Generate fast. Prep smarter. Reuse what matters.
          </footer>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
