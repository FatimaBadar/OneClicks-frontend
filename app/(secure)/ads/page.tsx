"use client";

import React, { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button
} from "@mui/material";

import DashboardCard from "@/app/_components/HomeComponent/DashboardCard";
import Navbar from "@/app/_components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { Ads } from "@/app/_models/adAccount.model";
import { ScheduleAdService, getAllAdsPayloadService, getAllAdsService } from "@/app/_services/adAccountService";
import AdForm from "@/app/_components/Ads/AdForm";

const typeColor = {
  Facebook: "rgb(19, 222, 185)",
  Instagram: "rgb(250, 137, 107)",
  Google: "rgb(73, 190, 255)",
};

const AdPage = () => {
  const [ads, setAds] = useState<Ads[]>([]);
  const [id, setId] = useState("");
  const [adName, setAdName] = useState("");
  const [adsetId, setAdsetId] = useState("");
  const [adsetName, setAdsetName] = useState("");
  const [creativeId, setCreativeId] = useState("");
  const [status, setStatus] = useState("");

  const type = "Facebook";
  const pbg = typeColor.Facebook;

  const router = useRouter()
  const searchParams = useSearchParams()

  var selectedAdsetId: string | null = searchParams.get("selectedAdsetId");
  if (selectedAdsetId == null) selectedAdsetId = "";

  var selectedCreativeId: string | null = searchParams.get("selectedCreativeId");
  if (selectedCreativeId == null) selectedCreativeId = "";

  useEffect(() => {
    getAdsData();
  }, []);

  const getAdsData = async () => {
    // try {
    //   const response = await getAllAdsPayloadService();
    //   if (response.statusCode == "200") {
    //     // setAds(response.responseData);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const ScheduleAds = async (e: FormEvent) => {
    const accessTokenfb = localStorage?.getItem('accesstoken_fb') ??  "";
    const adaccountId = localStorage?.getItem('adAccountId') ??  "";

    const tempAdsData: Ads = {
        adName,
        adsetId,
        adsetName,
        creativeId,
        status,
        accessToken: accessTokenfb,
        adAccountId: adaccountId
    };
    try {
        const response = await ScheduleAdService(tempAdsData);
        if (response.statusCode == "200") {
            setId(response.responseData);
        }
    } catch (error) {
    console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 10, 
        ml:10, mr: 10, mb: 5 }}>
        <AdForm/>
      </Box>
      {/* <Box sx={{ mt: 15 }}> */}
        <DashboardCard>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography variant="h5" fontWeight={550}>
              Ads
            </Typography>
          </Box>

          <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
                mt: 2,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Ad Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Adset Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Creative Id
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
                      Ad Account Id
                    </Typography>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ads?.map((data, key) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {data.adName}
                      </Typography>
                    </TableCell>

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
                        {data.creativeId}
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
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {data.adAccountId}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button 
                    //    onClick={() => {
                    //     router.push('/adsets' + '?' + CreateAdsets('selectedCampaignId' ,data.campaignId, 'selectedObjective', data.objective))
                    //   }}
                      variant="contained"
                      sx={{
                        marginRight: "10px",
                        backgroundColor: "#597FB5 !important",
                        color: "#fff !important",
                        "&:hover": {
                          backgroundColor: "#405D80 !important",
                        },
                      }}
                      onClick={ScheduleAds}
                      >
                        Create ad
                      </Button>
                    {/* <AdSetModal selectedCampaign={data.campaignId} selectedObjective={data.objective}/> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </DashboardCard>
      {/* </Box> */}
    </>
  );
};

export default AdPage;
