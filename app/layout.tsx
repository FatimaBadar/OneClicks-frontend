import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Chatbot from './_components/Chatbot';
import Hydrations from './hydration';
import "primereact/resources/themes/md-light-indigo/theme.css";

export const metadata: Metadata = {
  title: 'OneClicks',
  description: 'Marketing Hub',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Hydrations/>
        <Chatbot chatbotId="qgRc6KZSbQAPJObsnYrPL" domain="www.chatbase.co"  />
        {children}
      </body>
    </html>
  );
}
