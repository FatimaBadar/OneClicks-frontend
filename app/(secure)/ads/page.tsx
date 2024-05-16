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
  Button,
  Container,
  CircularProgress,
} from "@mui/material";

import Navbar from "@/app/_components/Navbar/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { AdData, Ads } from "@/app/_models/adAccount.model";
import {
  ScheduleAdService,
  getAllAdsService,
} from "@/app/_services/adAccountService";
import AdForm from "@/app/_components/Ads/AdForm";
import SuccessSnackbar from "@/app/_components/SuccessSnackbarComponent";
import FailureSnackbar from "@/app/_components/FailureSnackbarComponent";

const Facebook = "rgb(19, 222, 185)";
const Instagram = "rgb(250, 137, 107)";
const Google = "rgb(73, 190, 255)";

const AdPage = () => {
  const [ads, setAds] = useState<AdData[]>([]);
  const [id, setId] = useState("");
  const [adName, setAdName] = useState("");
  const [adsetId, setAdsetId] = useState("");
  const [adsetName, setAdsetName] = useState("");
  const [creativeId, setCreativeId] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [loader, setLoader] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  var f_AdsetId: string | null = searchParams.get("f_AdsetId");
  if (f_AdsetId == null) f_AdsetId = "";

  var f_CreativeId: string | null = searchParams.get("f_CreativeId");
  if (f_CreativeId == null) f_CreativeId = "";

  useEffect(() => {
    getAdsData();
  }, []);

  const getAdsData = async () => {
    setLoader(true);
    try {
      const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
      const adaccountId = localStorage?.getItem("adAccountId") ?? "";

      const response = await getAllAdsService(
        adaccountId.toString(),
        accessTokenfb
      );
      if (response.statusCode == "200") {
        setAds(response.responseData);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  const ScheduleAds = async (e: FormEvent) => {
    const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
    const adaccountId = localStorage?.getItem("adAccountId") ?? "";

    const tempAdsData: Ads = {
      adName,
      adsetId,
      adsetName,
      creativeId,
      status,
      accessToken: accessTokenfb,
      adAccountId: adaccountId,
      type: "Facebook",
    };
    try {
      const response = await ScheduleAdService(tempAdsData);
      if (response.statusCode == "200") {
        setId(response.responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      {loader ? (
        <Container
          maxWidth={false}
          sx={{ display: "flex", width: "fit-content", mt: "20%" }}
        >
          <CircularProgress size={"70px"} />
        </Container>
      ) : 
        <>
          <Box sx={{ mt: 10, ml: 20, mr: 20, mb: 5 }}>
            <AdForm />
          </Box>
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
              <Typography
                variant="h6"
                fontWeight={550}
                sx={{ ml: "15px", color: "darkblue" }}
              >
                Ads
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
                        Campaign Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Adset Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Creative Name
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
                          {data.name}
                        </Typography>
                      </TableCell>

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
                          {data.creativeName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          sx={{
                            px: "4px",
                            backgroundColor:
                              data.type === "Facebook"
                                ? Facebook
                                : data.type === "Instagram"
                                ? Instagram
                                : Google,
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </>
      }
      {success ? <SuccessSnackbar openBar={success} message={message} /> : ""}
      {failure ? <FailureSnackbar openBar={failure} message={message} /> : ""}
    </>
  );
};

export default AdPage;
