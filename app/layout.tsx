import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/Chatbot';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'O\'MAILLOT | Boutique en ligne de maillots de football',
  description: 'Achetez des maillots de football authentiques des meilleures équipes du monde',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the current path is in the admin section
  const isAdminPath = children?.toString().includes('/admin');

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {!isAdminPath && (
            <>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Chatbot />
            </>
          )}
          {isAdminPath && children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}