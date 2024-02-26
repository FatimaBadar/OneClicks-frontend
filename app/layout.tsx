import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import AuthProvider from './context/AuthProvider'
// import { FacebookProvider } from 'react-facebook';
// import Script from 'next/script';
// import Head from 'next/head';
// import { Toast } from 'primereact/toast';
import CreateCampaign from './_components/CreateCampaign';
const inter = Inter({ subsets: ['latin'] });
import Chatbot from './_components/Chatbot';

export const metadata: Metadata = {
  title: 'OneClicks',
  description: 'Marketing Hub',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <Head>
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        /> 
      </Head> */}
      <body className={inter.className}>
        <Chatbot chatbotId="qgRc6KZSbQAPJObsnYrPL" domain="www.chatbase.co"  />
        {children}
      </body>
    </html>
  );
}
