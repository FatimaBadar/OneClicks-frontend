'use client'
import { Inter } from 'next/font/google';

import Hero from './_components/LandingPageComponent/Hero';
import Pricing from './_components/LandingPageComponent/Guide';
import Footer1 from './_components/Footer1';
import Details from './_components/LandingPageComponent/Details';
import GetStarted from './_components/LandingPageComponent/GetStarted';
import Companies from './_components/LandingPageComponent/Companies';
import Cards from './_components/LandingPageComponent/Cards';
import useStore from './_store/authStore';
// import  Details from './_components/Details'
// import Properties from './_components/Properties'
import Navbar from './_components/Navbar';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const store = useStore();
  console.log('user in landing: ', store.authUser);

  return (
<>      <Navbar />
    <div className="main mx-auto" >

      <Hero />
      <br />
      <Companies />
      <br />
      <Details />
      <br />
      <Cards />
      <br />
      <Pricing />
      <br />
      <GetStarted />
      <br></br>
      <Footer1 />
      <br />
    </div>
    </>

  );
}
