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
import Navbar from "@/app/_components/Navbar/Navbar";
import { getAllAdsetsService } from "@/app/_services/adAccountService";
import AdsetForm from "@/app/_components/Ads/AdSetForm";
import { useRouter, useSearchParams } from "next/navigation";
import { Adset } from "@/app/_models/adAccount.model";

const Facebook= "rgb(19, 222, 185)";
const Instagram= "rgb(250, 137, 107)";
const Google="rgb(73, 190, 255)";

const Adsets = () => {
  const [adsets, setAdsets] = useState<Adset[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  var f_CampaignId: string | null =
    searchParams.get("f_CampaignId");
  if (f_CampaignId == null) f_CampaignId = "";
  var f_Objective: string | null = searchParams.get("f_Objective");
  if (f_Objective == null) f_Objective = "";

  const CreateAdcreative = (name1: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name1, value);
    return params.toString();
  };

  const ScheduleAd = useCallback(
    (name1: string, value: string, name2: string, value2: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name1, value);
      params.set(name2, value2);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    getAdsets();
  }, []);

  const getAdsets = async () => {
    try {
      const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
      const adaccountId = localStorage?.getItem("adAccountId") ?? "";

      const response = await getAllAdsetsService(
        adaccountId.toString(),
        accessTokenfb
      );
      if (response.statusCode == "200") {
        setAdsets(response.responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 10, ml: 10, mr: 10 }}>
        {f_CampaignId ? (
          <AdsetForm
            campaign={f_CampaignId}
            objective={f_Objective}
          />
        ) : (
          ""
        )}
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
          <Typography variant="h6" fontWeight={550} sx={{ ml: "15px", color: "darkblue" }}>
            Ad adsets
          </Typography>
        </Box>

        <Box sx={{ overflow: "auto", width: { xs: "100%", sm: "auto" } }}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#EEF8FD" }}>
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
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Start time
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
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
                        {data.startTime}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
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
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        router.push(
                          "/ads" +
                            "?" +
                            ScheduleAd(
                              "f_AdsetId",
                              data.adsetId,
                              "f_CampaignId",
                              f_CampaignId ?? ""
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
                      Schedule ad
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

export default Adsets;
