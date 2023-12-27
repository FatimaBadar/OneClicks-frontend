'use client'

import React from 'react';
// import { Select, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from './DashboardCard';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'),   { ssr: false })

const ContactsCreated = () => {

    // select
    const [month, setMonth] = React.useState('1');

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    // const primary = theme.palette.primary.main;
    // const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370
        },
        colors: ["rgb(250, 137, 107)"],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: 6,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',

                dataLabels: {
                    // enabled: true,
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#333']
            },
            offsetX: 0,
            offsetY: -18
          },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
      
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            min: 0,
            max: 60,
            tickAmount: 4,
            title: {
                text: "Count of Contacts",
                rotate: -90,
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: undefined,
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-title',
                },
            },
        },
        xaxis: {
            categories: ['2/11/2023',,,,,,,,,,, '16/11/2023',,,,,,,,,,,'26/11/2023'],
            // ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
            axisBorder: {
                show: false,
            },
            title: {
                text: "Create date",
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: undefined,
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-title',
                },
            },
            // tickPlacement: 'on'

        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart = [
        {
            // name: 'Eanings this month',
            data: [6,6,17,11,20,16,10,6,8,16,14,29,24,22,18,
            20,20,25,26,24,53,18,18,49,35,57,30,10,6,8],
        },
        // {
        //     name: 'Expense this month',
        //     data: [215, 250, 280, 325],
        // },
    ];

    return (

        <DashboardCard title="Contacts Created"
        subtitle="Date Range: In the last 30 days | Frequency: Daily">
        {/* //  action={
        //     <Select
        //         labelId="month-dd"
        //         id="month-dd"
        //         value={month}
        //         size="small"
        //         onChange={handleChange}
        //     >
        //         <MenuItem value={1}>March 2023</MenuItem>
        //         <MenuItem value={2}>April 2023</MenuItem>
        //         <MenuItem value={3}>May 2023</MenuItem>
        //     </Select>
        // } */}
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
                width={700}
            />
        </DashboardCard>
    );
};

export default ContactsCreated;
