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
} from "@mui/material";
import DashboardCard from "@/app/_components/HomeComponent/DashboardCard";
import Navbar from "@/app/_components/Navbar";
import { AdCreative } from "@/app/_models/adAccount.model";
import AdCreativeForm from "@/app/_components/Ads/AdCreativeForm";
import useAdStore from "@/app/_store/adStore";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllAdcreativesService } from "@/app/_services/adAccountService";

const AdCreatives = () => {
  // const [creatives, setCreatives] = useState<AdCreative[]>([]);
  const { creatives, setCreatives, removeCreatives } = useAdStore((state) => ({
    creatives: state.creatives,
    setCreatives: state.setCreatives,
    removeCreatives: state.removeCreatives,
  }));

  const router = useRouter()
  const searchParams = useSearchParams();
  var selectedAdsetId: string | null = searchParams.get("selectedAdsetId");
  if (selectedAdsetId == null) selectedAdsetId = "";
  
  useEffect(() => {
    getAdCreatives();
  }, []);

  const getAdCreatives = async () => {
    try {
      const response = await getAllAdcreativesService();
      if (response.statusCode == "200") {
        setCreatives(response.responseData);
        console.log("creatives: ", creatives)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar/>
      <Box sx={{ mt: 15 }}>
      <AdCreativeForm/>
      </Box>
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
              Ad Creatives
            </Typography>
            {/* <div>
              <AdCampaignModal />
            </div> */}
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
                      Creative Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
  
                      Image
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Message
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {creatives?.map((data, key) => (
                  <TableRow key={data.creativeId}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {data.name}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >Image
                        {/* {data.image} */}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {data.message}
                      </Typography>
                    </TableCell>
                    {/* <TableCell align="right">
                    <AdSetModal selectedCampaign={data.campaignId} selectedObjective={data.objective}/>
                    </TableCell> */}
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

export default AdCreatives;
