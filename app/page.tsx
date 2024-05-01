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
import Navbar from './_components/Navbar';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const store = useStore();
  console.log('user in landing: ', store.authUser);

  useEffect(() => {
    const getAccessTokenFromURL = () => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      console.log(params)
      const access_token = params.get('code'); 

      if (access_token) {
        console.log('Access token:', access_token);
        localStorage.setItem('access_tokenGoogle', access_token as string);
        trySampleRequest();
      } else {
        console.log('Access token not found in the URL');
      }
    };
    getAccessTokenFromURL();
    }, []);

    const trySampleRequest = () => {
      const accessToken = localStorage.getItem('access_tokenGoogle');
      if (accessToken) {
        fetch('https://www.googleapis.com/drive/v3/about?fields=user', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => response.json())
        .then(data => console.log("sample google request: ",data))
        .catch(error => console.error('Error:', error));
      }
    };
  
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
