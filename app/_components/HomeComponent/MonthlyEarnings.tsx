'use client'

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import DashboardCard from './DashboardCard';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'),   { ssr: false })

const MonthlyEarnings = () => {
  const [earnings, setEarnings] = useState("$6,820")

  const theme = useTheme();
  const secondary = "rgb(73, 190, 255)";
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  // rgb(19, 222, 185) - green
  // rgb(73, 190, 255) - blue
  ///rgb(93, 135, 255) -dark blue
  // chart
  const optionscolumnchart: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'gradient',
      opacity: 0.05,
      // type: 'gradient',
      // gradient: {
      //   shadeIntensity: 1,
      //   opacityFrom: 0.7,
      //   opacityTo: 0.9,
      //   stops: [0, 100]
      // }
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Monthly Earnings"
      action={
        <Fab size="medium" sx={{color: 'rgb(73, 190, 255)'}}>
          <AttachMoneyIcon width={24} />
          {/* sx={{color: 'rgb(73, 190, 255)'}} /> */}
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} 
        series={seriescolumnchart} type="area" height="60px" 
        width={700}
        />
      }
    >
      <>
        <Typography variant="h5" fontWeight="550" mt="-20px">
          {earnings}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
          <SouthEastIcon width={20} sx={{color:"#FA896B"}} /> 
          </Avatar>
          <Typography variant="subtitle2" fontWeight="500">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last year
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
