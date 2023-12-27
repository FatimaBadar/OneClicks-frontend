'use client';

import React from 'react';
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

export default function Home() {
  const store = useStore();
  console.log('store in home: ', store.authUser);

  return (
    <>
          <Navbar/>

      <PageContainer title="Dashboard" description="this is Dashboard">
        <Box sx={{ mt:15}}>
          <Grid container spacing={3}>
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

            <Grid item xs={12} lg={12}>
              <AdAccountsSummary />
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
}
