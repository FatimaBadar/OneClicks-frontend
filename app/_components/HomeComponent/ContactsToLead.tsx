'use client'
import React from 'react';
import { useTheme } from '@mui/material/styles';
import DashboardCard from './DashboardCard';
// import Chart from 'react-apexcharts';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'),   { ssr: false })

const ContactsToLead = () => {

    const theme = useTheme();
    const optionscolumnchart: ApexCharts.ApexOptions = {
        chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: ["rgba(93, 135, 255, 0.85)", "rgb(73, 190, 255)"],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: 6,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
        dataLabels: {
            enabled: false,
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
            // min: 0,
            // max: 500,
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
            categories: ['Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023'],
            // ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
            axisBorder: {
                show: false,
            },
            title: {
                text: "Date entered 'Qualified Contacts to View'",
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
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart = [
        {
            name: 'Eanings this month',
            data: [300, 350, 355, 390],
        },
        {
            name: 'Expense this month',
            data: [215, 250, 280, 325],
        },
    ];

    return (

        <DashboardCard title="Qualified Contacts-to-lead"
        subtitle="Date Range: From 7/1/2023 to 10/31/2023"
        //  action={
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
        // }
        >
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="area"
                height="370px"
                width={700}

            />
        </DashboardCard>
    );
};

export default ContactsToLead;
