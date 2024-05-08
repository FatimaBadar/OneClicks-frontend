'use client';

import React, { useEffect, useState } from 'react';
import useStore from '@/app/_store/authStore';

import { Grid, Box, Container } from '@mui/material';
import PageContainer from '@/app/_components/HomeComponent/PageContainer';
import ContactsToLead from '@/app/_components/HomeComponent/ContactsToLead';
import AmountSpent from '@/app/_components/HomeComponent/AmountSpent';
import RecentActivity from '@/app/_components/HomeComponent/RecentActivity';
import MonthlyEarnings from '@/app/_components/HomeComponent/MonthlyEarnings';
import AdAccountsSummary from '@/app/_components/HomeComponent/AdAccountsSummary';
import ContactsCreated from '@/app/_components/HomeComponent/ContactsCreated';
import Navbar from '@/app/_components/Navbar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const store = useStore();
  const router = useRouter();
  const [checkLogin, setcheckLogin] = useState<boolean>(true);
  console.log('user store in home: ', store.authUser);

  useEffect(() => {
    if (store.authUser) {
      setcheckLogin(true);
    } else {      
      setcheckLogin(false);
      router.push('/account/login');
    }
  }, []);
  const getAccessTokenFromURL = () => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    console.log(params)
    const access_token = params.get('code'); 

    if (access_token) {
      console.log('Access token:', access_token);
      localStorage.setItem('access_tokenGoogle', access_token as string);
 
    } else {
      console.log('Access token not found in the URL');
    }
  };
  return (
    <>
      {/* {checkLogin && ( */}
        <div>
          <Navbar />
          <PageContainer title="Dashboard" description="this is Dashboard">
            <Box sx={{ mt: 15 }}>
              <Grid container spacing={3}>
                
                <Grid item xs={12} lg={12}>
                  <AdAccountsSummary />
                </Grid>

                <Grid item xs={12} lg={7}>
                  <ContactsCreated />
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <AmountSpent />
                    </Grid>
                    <Grid item xs={12}>
                      <MonthlyEarnings />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <RecentActivity />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ContactsToLead />
                </Grid>
              
              </Grid>
            </Box>
          </PageContainer>
        </div>
      {/* )}  */}
    </>
  );
}
