"use client";

import React, { useCallback, useEffect, useState } from "react";
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

import AdCampaignModal from "@/app/_components/Ads/AdCampaignModal";
import Navbar from "@/app/_components/Navbar";
import { getAllCampaignsService } from "@/app/_services/adAccountService";
import { useRouter, useSearchParams } from "next/navigation";
import { Campaign } from "@/app/_models/adAccount.model";
import GoogleAdCampaignModal from "@/app/_components/GoogleAds/GoogleAdCampaignModal";

const Facebook= "rgb(19, 222, 185)";
const Instagram= "rgb(250, 137, 107)";
const Google="rgb(73, 190, 255)";

const Adcampaigns = () => {
  const impressions = 0;
  const clicks = 0;

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [adAccountType, setAccountType] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  if (searchParams.get("account") != ""){
    var account: string | null = searchParams.get("account");
    if (account != null){
      setAccountType(account)
    }
  }
  
  useEffect(() => {
    getCampaigns();
  }, []);

  const getCampaigns = async () => {
    try {
      const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
      const adaccountId = localStorage?.getItem("adAccountId") ?? "";

      const response = await getAllCampaignsService(
        adaccountId.toString(),
        accessTokenfb
      );
      if (response.statusCode == "200") {
        setCampaigns(response.responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const CreateAdsets = useCallback(
    (name1: string, value: string, name2: string, value2: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name1, value);
      params.set(name2, value2);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 15 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#D6E0FE",
            height: "55px",
          }}
        >
          <Typography variant="h6" fontWeight={550} sx={{ ml: "15px" }}>
            Ad Campaigns
          </Typography>
          <div>
            <AdCampaignModal />
            <GoogleAdCampaignModal/>
          </div>
        </Box>

        <Box sx={{ overflow: "auto", width: { xs: "100%", sm: "auto" } }}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#EEF8FD" }}>
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
                  <Typography
                    align="center"
                    variant="subtitle2"
                    fontWeight={600}
                  >
                    Impressions
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    align="center"
                    variant="subtitle2"
                    fontWeight={600}
                  >
                    Clicks
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns?.map((data, key) => (
                <TableRow key={data.campaignId}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {data.campaignName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {data.objective}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: {type: "Facebook" ? Facebook : Google},
                        color: "#fff",
                      }}
                      size="small"
                      label={data.type}
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
                  <TableCell align="center">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                      sx={{ textAlign: "center", justifyContent: "center" }}
                    >
                      {impressions}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      {clicks}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        router.push(
                          "/adsets" +
                            "?" +
                            CreateAdsets(
                              "selectedCampaignId",
                              data.campaignId,
                              "selectedObjective",
                              data.objective
                            )
                        );
                      }}
                      variant="contained"
                      sx={{
                        backgroundColor: "#597FB5 !important",
                        color: "#fff !important",
                        "&:hover": {
                          backgroundColor: "#405D80 !important",
                        },
                      }}
                    >
                      Create ad
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Adcampaigns;
