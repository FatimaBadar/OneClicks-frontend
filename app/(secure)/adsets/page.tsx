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
// import AdSetModal from "@/app/_components/Ads/AdSetModal"
import Navbar from "@/app/_components/Navbar";
// import { getAllCampaignsService } from "@/app/_services/adAccountService";
// import { Campaign } from "@/app/_models/adAccount.model";
import useAdStore from "@/app/_store/adStore";
import AdSetModal from "@/app/_components/Ads/AdSetModal";
const typeColor = {
  Facebook: "rgb(19, 222, 185)",
  Instagram: "rgb(250, 137, 107)",
  Google: "rgb(73, 190, 255)",
};

const Adsets = () => {
//   const [adsets, setAdsets] = useState<Campaign[]>([]);
const type = "Facebook";
const pbg = typeColor.Facebook;

const { adsets, setAdsets, removeAdsets } =
useAdStore((state) => ({
  adsets: state.adsets,
  setAdsets: state.setAdsets,
  removeAdsets: state.removeAdsets,
}));

//   useEffect(() => {
//     getAdsets();
//   }, []);

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
      <Box sx={{ mt: 15 }}>
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
              Ad adsets
            </Typography>
            <div>
                adsetmodal 
                {/* //TODO */}

              {/* <AdSetModal /> */}
            </div>
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
                      Campaign Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Objective
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
                      Impressions
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Clicks
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                  </TableCell>
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
                        {data.interests}
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
                        {data.bidAmount}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {data.interests}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                    {/* <AdSetModal selectedCampaign={data.campaignId} selectedObjective={data.objective}/> */}
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