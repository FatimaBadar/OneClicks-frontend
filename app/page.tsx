// import Image from 'next/image'
// import styles from './page.module.css'
import { Inter } from 'next/font/google';
// import Footer from './_components/footer'
// import Signup from './(public)/account/register/page'
// import HeaderComponent from './_components/header'
// import Header from './_components/header'
import Hero from './_components/Hero';
import Pricing from './_components/Guide';
import Footer1 from './_components/Footer1';
import Details from './_components/Details';
import GetStarted from './_components/GetStarted';
import Companies from './_components/Companies';
import Cards from './_components/Cards';
// import  Details from './_components/Details'
// import Properties from './_components/Properties'
import Navbar from './_components/Navbar';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  
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
