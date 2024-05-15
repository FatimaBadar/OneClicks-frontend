'use client'
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import NorthWestOutlinedIcon from '@mui/icons-material/NorthWestOutlined';
import DashboardCard from './DashboardCard';
import dynamic from 'next/dynamic';
import { GetBudgetAmountFacebook } from '@/app/_services/insightsService';
const Chart = dynamic(() => import('react-apexcharts'),   { ssr: false })

const AmountSpent = () => {
  const [amount, setAmount] = useState<string>("")
  useEffect(() => {
   
  
    fetchData();
  }, []);
  const adAccountId = localStorage?.getItem('adAccountId') ?? "";

  const fetchData = async () => {
    try {
      const accesstoken_Google = localStorage?.getItem('accesstoken_fb') ?? "";
      const response = await GetBudgetAmountFacebook(adAccountId, accesstoken_Google);
      if (response.statusCode === "200") {
        setAmount(response.responseData.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };
  // chart color
  const theme = useTheme();
  const primary = "rgb(93, 135, 255)";
  const primarylight = '#ecf2ff';
  // chart
  const optionscolumnchart: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [38, 40, 25];

  return (
    <DashboardCard title="Amount Spent">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h5" fontWeight="550">
            {amount}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: "rgb(230, 255, 250)", width: 27, height: 27 }}>
              <NorthWestOutlinedIcon sx={{color:"#39B69A"}} width={20} />
              {/* sx={{color: '#597FB5' , mt: 3, mb: 2, fontSize:45 }}></MarkEmailReadIcon> */}
            </Avatar>
            <Typography variant="subtitle2" fontWeight="500">
              +9%
            </Typography>
            <Typography variant="subtitle2" color="#39B69A">
              last year
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                2022
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                2023
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
            width={200}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default AmountSpent;
