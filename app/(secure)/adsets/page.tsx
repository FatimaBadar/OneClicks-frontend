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
// import AdSetModal from "@/app/_components/Ads/AdSetModal"
import Navbar from "@/app/_components/Navbar";
// import { getAllCampaignsService } from "@/app/_services/adAccountService";
// import { Campaign } from "@/app/_models/adAccount.model";
import useAdStore from "@/app/_store/adStore";
import AdSetModal from "@/app/_components/Ads/AdSetModal";
import AdsetForm from "@/app/_components/Ads/AdSetForm";
import { useRouter, useSearchParams } from "next/navigation";
const typeColor = {
  Facebook: "rgb(19, 222, 185)",
  Instagram: "rgb(250, 137, 107)",
  Google: "rgb(73, 190, 255)",
};

// interface AdSetProps {
//   selectedCampaign: string;
//   selectedObjective: string;
// }

// const Adsets: React.FC<AdSetProps> = ({ selectedCampaign, selectedObjective }) => {
const Adsets = () => {
  //   const [adsets, setAdsets] = useState<Campaign[]>([]);
  const type = "Facebook";
  const pbg = typeColor.Facebook;

  const { adsets, setAdsets, removeAdsets } = useAdStore((state) => ({
    adsets: state.adsets,
    setAdsets: state.setAdsets,
    removeAdsets: state.removeAdsets,
  }));
  const router = useRouter()
  const searchParams = useSearchParams();
  var selectedCampaignId: string | null =
    searchParams.get("selectedCampaignId");
  if (selectedCampaignId == null) selectedCampaignId = "";

  var selectedObjective: string | null = searchParams.get("selectedObjective");
  if (selectedObjective == null) selectedObjective = "";

  
  const CreateAdcreative = (name1: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name1, value);
      // params.set(name2, value2);
  
      return params.toString()
    }
  // const selectedObjective = searchParams.get('selectedObjective');

  //   const getAdsets = async () => {
  //     try {
  //       const response = await getAllCampaignsService();
  //       if (response.statusCode == "200") {
  //         setAdsets(response.responseData);
  //         console.log("adsets: ", adsets)
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 13, ml:15, mr: 15}}>
        <AdsetForm
          campaign={selectedCampaignId}
          objective={selectedObjective}
        />
      </Box>
      <Box sx={{ mt: 5 }}>
        <DashboardCard>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography variant="h6" fontWeight={550}>
              Ad adsets
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
                  <TableRow key={data.campaignId}>
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
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {data.startTime}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                    <Button 
                       onClick={() => {
                        router.push('/adsets' + '?' + CreateAdcreative('selectedCampaignId' ,data.adsetName))
                      }}
                      variant="contained"
                      sx={{
                        marginRight: "10px",
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
        </DashboardCard>
      </Box>
    </>
  );
};

export default Adsets;
