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
import Navbar from "@/app/_components/Navbar";
import { getAllAdsetsService } from "@/app/_services/adAccountService";
import { useRouter, useSearchParams } from "next/navigation";
import { Adset } from "@/app/_models/adAccount.model";
import AdSearchForm from "@/app/_components/GoogleAds/AdSearchForm";
import { GetAllAdsService } from "@/app/_services/googleService";
import { AdGroup } from "@/app/_models/Google.model";

const Facebook= "rgb(19, 222, 185)";
const Instagram= "rgb(250, 137, 107)";
const Google="rgb(73, 190, 255)";

const Adsets = () => {
  const searchParams = useSearchParams();
  const [googleAds, setGoogleAds] = useState<AdGroup[]>([]);

  var f_CampaignId: string | null =
    searchParams.get("f_CampaignId");
  if (f_CampaignId == null) f_CampaignId = "";
  var f_Objective: string | null = searchParams.get("f_Objective");
  if (f_Objective == null) f_Objective = "";

  useEffect(() => {
    getAds();
  }, []);

  const getAds = async () => {
    try {

      const accessTokengoogle = localStorage?.getItem("accesstoken_Google") ?? "";
      const customerId = localStorage?.getItem("g_managerId") ?? "";

      const response = await GetAllAdsService(accessTokengoogle,parseFloat(customerId));
      if (response.statusCode == "200") {
        setGoogleAds(response.responseData);
        console.log(response.responseData)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 10, ml: 10, mr: 10 }}>
        <AdSearchForm/>
        {/* {f_CampaignId ? (
          <AdsetForm
            campaign={f_CampaignId}
            objective={f_Objective}
          />
        ) : (
          ""
        )} */}
      </Box>

      <Box sx={{ mt: 5 }}>
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
            Ad adsets
          </Typography>
        </Box>

        <Box sx={{ overflow: "auto", width: { xs: "100%", sm: "auto" } }}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#EEF8FD" }}>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ad Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Headlines
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Descriptions
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Type
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography variant="subtitle2" fontWeight={600}>
                    Status
                  </Typography>
                </TableCell>
  
              </TableRow>
            </TableHead>
            <TableBody>
              {googleAds?.map((data, key) => (
                <TableRow key={data.adId}>
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
                      {data.headlines}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={600}
                      >
                        {data.descriptions}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: data.type === "Facebook" ? Facebook : data.type === "Instagram" ? Instagram : Google,
                        color: "#fff",
                      }}
                      size="small"
                      label={data.type}
                    ></Chip>
                  </TableCell>

                  <TableCell>
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
                 
                  {/* <TableCell align="center">
                    <Button
                      onClick={() => {
                        router.push(
                          "/adcreatives" +
                            "?" +
                            CreateAdcreative("f_AdsetId", data.adsetId)
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
                  </TableCell> */}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Adsets;
