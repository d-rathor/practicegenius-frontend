import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionProvider from '@/providers/SessionProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { WorksheetProvider } from '@/contexts/WorksheetContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PracticeGenius - Educational Worksheets for Grades 1-5',
  description: 'Access high-quality educational worksheets for Math, Science, and English for grades 1-5 with subscription-based plans.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <AuthProvider>
            <WorksheetProvider>
              {children}
            </WorksheetProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
