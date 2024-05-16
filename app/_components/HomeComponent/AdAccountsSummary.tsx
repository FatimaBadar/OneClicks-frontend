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
import DashboardCard from "./DashboardCard";
import AccountLogin from "../Ads/AdAccountLogin";
import CreateAd from "../Ads/CreateAd";
import { getAllCampaignsFacebook } from "@/app/_services/adAccountService";
import { Campaign } from "@/app/_models/adAccount.model";
import { GoogleCampaign } from "@/app/_models/Google.model";
import { GetAllCampaignsGoogle } from "@/app/_services/googleService";
import { CombinedCampaign } from "@/app/_models/ad.model";

// const accounts = [
//   {
//     id: "1",
//     name: "Promoting Biglytics post",
//     accountName: "Biglytics Ad Account",
//     status: "Completed",
//     type: "Facebook",
//     impressions: 0,
//     clicks: 0,
//     pbg: typeColor.Facebook,
//     budget: 3.9,
//   },
//   {
//     id: "2",
//     name: "Capture automate screen",
//     accountName: "Biglytics Ad Account",
//     status: "Completed",
//     type: "Facebook",
//     impressions: 1,
//     clicks: 1,
//     pbg: typeColor.Facebook,
//     budget: 24.5,
//   },
//   {
//     id: "3",
//     name: "Big Data Ebook",
//     accountName: "Biglytics Ad Account",
//     status: "Completed",
//     type: "Facebook",
//     impressions: 5,
//     clicks: 10,
//     pbg: typeColor.Facebook,
//     budget: 12.8,
//   },
//   {
//     id: "4",
//     name: "Default Campaign Group",
//     accountName: "Biglytics",
//     status: "Active",
//     type: "Facebook",
//     impressions: 6,
//     clicks: 8,
//     pbg: typeColor.Facebook,
//     budget: 2.4,
//   },
// ];
const Facebook = "rgb(19, 222, 185)";
const Instagram = "rgb(250, 137, 107)";
const Google = "rgb(73, 190, 255)";

const AdAccountsSummary = () => {
var Fb_Budget: number = 0;
  const [facebookCampaigns, setFacebookCampaigns] = useState<any[]>([]);
  const [googleCampaigns, setGoogleCampaigns] = useState<any[]>([]);
  const [combinedCampaigns, setCombinedCampaigns] = useState<any[]>([]);
  const getCampaigns = async () => {
    const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
    const adaccountId = localStorage?.getItem("adAccountId") ?? "";
    const accessTokenGoogle = localStorage?.getItem("accesstoken_Google") ?? "";
    const selectedClientId = localStorage?.getItem("g_ClientId") ?? "";
    const selectedManagerId = localStorage?.getItem("g_ManagerId") ?? "";

    try {
      if (accessTokenfb && adaccountId) {
        const response = await getAllCampaignsFacebook(
          adaccountId.toString(),
          accessTokenfb
        );
        if (response.statusCode === "200") {
          Fb_Budget =0
          setFacebookCampaigns(response.responseData);
          console.log(response.responseData)
          response.responseData.forEach(item => {
            Fb_Budget = Fb_Budget+ item.budget
          });
          console.log("Budget Fb", Fb_Budget)

        }
      }
    } catch (error) {
      console.error(error);
    }

    try {
      if (accessTokenGoogle && selectedClientId && selectedManagerId) {
        const response2 = await GetAllCampaignsGoogle(
          accessTokenGoogle,
          parseFloat(selectedClientId),
          parseFloat(selectedManagerId)
        );
        if (response2.statusCode === "200") {
          setGoogleCampaigns(response2.responseData);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  useEffect(() => {
    // Combine campaigns whenever either Facebook or Google campaigns change
    setCombinedCampaigns([...facebookCampaigns, ...googleCampaigns]);
  }, [facebookCampaigns, googleCampaigns]);
  console.log(combinedCampaigns);
  return (
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
          Dashboard
        </Typography>
        <div>
          <CreateAd />
          <AccountLogin />
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
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Type
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
                <Typography variant="subtitle2" fontWeight={600}>
                  Budget
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combinedCampaigns.map((campaign) => (
              <TableRow key={campaign.campaignId}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {campaign.campaignName}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {campaign.status}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {campaign.status}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Chip
                    sx={{
                      px: "4px",
                      backgroundColor:
                        campaign.type === "Facebook"
                          ? Facebook
                          : campaign.type === "Instagram"
                          ? Instagram
                          : Google,
                      color: "#fff",
                    }}
                    size="small"
                    label={campaign.type}
                  ></Chip>
                </TableCell>

                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {/* {campaign.impressions} */} 0
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {/* {account.clicks} */} 0
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography color="textSecondary" variant="subtitle2">
                    {campaign.budget ? `$${campaign.budget}k` : "N/A"}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default AdAccountsSummary;
