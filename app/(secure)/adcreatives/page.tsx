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
  Button,
  Chip,
} from "@mui/material";
import Navbar from "@/app/_components/Navbar/Navbar";
import { AdCreative } from "@/app/_models/adAccount.model";
import AdCreativeForm from "@/app/_components/Ads/AdCreativeForm";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllAdcreativesService } from "@/app/_services/adAccountService";

const Facebook= "rgb(19, 222, 185)";
const Instagram= "rgb(250, 137, 107)";
const Google="rgb(73, 190, 255)";

const AdCreatives = () => {
  const [creatives, setCreatives] = useState<AdCreative[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  var f_AdsetId: string | null = searchParams.get("f_AdsetId");
  if (f_AdsetId == null) f_AdsetId = "";

  useEffect(() => {
    getAdCreatives();
  }, []);

  const getAdCreatives = async () => {
    try {
      const response = await getAllAdcreativesService();
      if (response.statusCode == "200") {
        setCreatives(response.responseData);
        console.log("creatives: ", creatives);
      }
    } catch (error) {
      console.error(error);
    }
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

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 15 }}>
        <AdCreativeForm adset={f_AdsetId} />
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
          Ad Creatives
        </Typography>
      </Box>

      <Box sx={{ overflow: "auto", width: { xs: "100%", sm: "auto" } }}>
        <Table
          aria-label="simple table"
        >
          <TableHead sx={{ backgroundColor: "#EEF8FD" }}>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Creative Name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  Image
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  Type
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  Message
                </Typography>
              </TableCell>
              <TableCell> </TableCell>
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
                    {data.creativeName}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {data.fileName}
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
                <TableCell align="center">
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {data.message}
                  </Typography>
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
                            "f_CreativeId",
                            data.creativeId
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

export default AdCreatives;
