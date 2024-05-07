"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import DashboardCard from "@/app/_components/HomeComponent/DashboardCard";
import Navbar from "@/app/_components/Navbar";
import { getAllAdsetsService } from "@/app/_services/adAccountService";
import AdsetForm from "@/app/_components/Ads/AdSetForm";
import { useRouter, useSearchParams } from "next/navigation";
import { Adset } from "@/app/_models/adAccount.model";

const typeColor = {
  Facebook: "rgb(19, 222, 185)",
  Instagram: "rgb(250, 137, 107)",
  Google: "rgb(73, 190, 255)",
};

const Adsets = () => {
  const type = "Facebook";
  const pbg = typeColor.Facebook;

  const [adsets, setAdsets] = useState<Adset[]>([]);  
  const router = useRouter()
  const searchParams = useSearchParams();
  
  var selectedCampaignId: string | null = searchParams.get("selectedCampaignId");
  if (selectedCampaignId == null) selectedCampaignId = "";
  var selectedObjective: string | null = searchParams.get("selectedObjective");
  if (selectedObjective == null) selectedObjective = "";
  
  const CreateAdcreative = (name1: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name1, value);
    return params.toString()
  }

  useEffect(() => {
    getAdsets();
  }, []);

  const getAdsets = async () => {
    try {
      const accessTokenfb = localStorage?.getItem('accesstoken_fb') ??  "";
      const adaccountId = localStorage?.getItem('adAccountId') ??  "";

      const response = await getAllAdsetsService(adaccountId.toString(), accessTokenfb);
      if (response.statusCode == "200") {
        setAdsets(response.responseData);
        console.log("adsets: ", adsets)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      
      <Box sx={{ mt: 10, 
        ml:10, mr: 10}}>
          { selectedCampaignId ? 
        <AdsetForm
          campaign={selectedCampaignId}
          objective={selectedObjective}
        />
        : ""}
      </Box>

      <Box sx={{ mt: 5 }}>
        {/* <DashboardCard> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: '#D6E0FE',
              height: '50px'
            }}
          >
            <Typography variant="h6" fontWeight={550} sx={{ml: "15px"}}>
              Ad adsets
            </Typography>
          </Box>

          <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
            <Table
              aria-label="simple table"
            >
              <TableHead sx={{backgroundColor: '#EEF8FD'}}>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Adset Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Optimization Goal
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Start time
                    </Typography>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adsets?.map((data, key) => (
                  <TableRow key={data.adsetId}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {data.adsetName}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {data.optimizationGoal}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          px: "4px",
                          backgroundColor: pbg,
                          color: "#fff",
                        }}
                        size="small"
                        label={type}
                      ></Chip>
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={600}>
                          {data.status}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography color="textSecondary"
                          variant="subtitle2" fontWeight={600}>
                          {data.startTime}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                    <Button 
                       onClick={() => {
                        router.push('/adcreatives' + '?' + CreateAdcreative('selectedAdsetId' ,data.adsetId))
                      }}
                      variant="contained"
                      sx={{
                        backgroundColor: "#597FB5 !important",
                        color: "#fff !important",
                        "&:hover": {
                          backgroundColor: "#405D80 !important",
                        },
                      }}>
                        Create ad
                      </Button>                    
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        {/* </DashboardCard> */}
      </Box>
    </>
  );
};

export default Adsets;
