import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import AuthProvider from './context/AuthProvider'
// import { FacebookProvider } from 'react-facebook';
import Script from 'next/script';
import Head from 'next/head';
// import { Toast } from 'primereact/toast';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OneClicks',
  description: 'Marketing Hub',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        />
      </Head>
      <body className={inter.className}>
        {/* <Toast /> */}
        {children}
      </body>
    </html>
  );
}
