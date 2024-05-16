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
  Container,
  CircularProgress,
} from "@mui/material";

import Navbar from "@/app/_components/Navbar/Navbar";
import { getAllCampaignsFacebook } from "@/app/_services/adAccountService";
import { useRouter, useSearchParams } from "next/navigation";
import { Campaign } from "@/app/_models/adAccount.model";
import CreateCampaignDropdown from "@/app/_components/CreateCampaignDropdown";
import { GoogleCampaign } from "@/app/_models/Google.model";
import { GetAllCampaignsGoogle } from "@/app/_services/googleService";
import { CombinedCampaign } from "@/app/_models/ad.model";
import SuccessSnackbar from "@/app/_components/SuccessSnackbarComponent";
import FailureSnackbar from "@/app/_components/FailureSnackbarComponent";

const Facebook = "rgb(19, 222, 185)";
const Instagram = "rgb(250, 137, 107)";
const Google = "rgb(73, 190, 255)";

const Adcampaigns = () => {
  const impressions = 0;
  const clicks = 0;

  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [facebookCampaigns, setFacebookCampaigns] = useState<Campaign[]>([]);
  const [googleCampaigns, setGoogleCampaigns] = useState<GoogleCampaign[]>([]);
  const [combinedCampaigns, setCombinedCampaigns] = useState<
    CombinedCampaign[]
  >([...facebookCampaigns, ...googleCampaigns]);
  // setCombinedCampaigns();

  const [adAccountType, setAccountType] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    getFacebookCampaigns();
   // getGoogleCampaigns();

    if (searchParams.get("account") != "") {
      var account: string | null = searchParams.get("account");
      if (account != null) {
        setAccountType(account);
      }
    }
    // if(googleCampaigns.length>0 || facebookCampaigns.length>0){
    //   setCombinedCampaigns([...facebookCampaigns, ...googleCampaigns]);
    // }
  }, []);

  const getFacebookCampaigns = async () => {
    
    const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
    const adaccountId = localStorage?.getItem("adAccountId") ?? "";
    try {

      const response = await getAllCampaignsFacebook(
        adaccountId.toString(),
        accessTokenfb
      );
      if (response.statusCode === "200") {
        setFacebookCampaigns(response.responseData);
        //setCombinedCampaigns(response.responseData);

        try {
          const accessTokengoogle =
            localStorage?.getItem("accesstoken_Google") ?? "";
            const customerId = localStorage?.getItem("g_clientId") ?? "";
          const managerId = localStorage?.getItem("g_managerId") ?? "";
    
          const response2 = await GetAllCampaignsGoogle(
            accessTokengoogle,
            parseFloat(customerId),
            parseFloat(managerId)
          );
          if (response2.statusCode == "200") {
            setGoogleCampaigns(response2.responseData);
            setCombinedCampaigns([...response.responseData,...response2.responseData]);
            console.log(googleCampaigns);
          }
        } catch (error) {
          console.error(error);
        }

      }
    } catch (error) {
      console.error(error);
    }
  }
  // const getGoogleCampaigns = async () => {
  //   try {
  //     const accessTokengoogle =
  //       localStorage?.getItem("accesstoken_Google") ?? "";
  //     const customerId = localStorage?.getItem("g_managerId") ?? "";

  //     const response2 = await GetAllGoogleCampaignsService(
  //       accessTokengoogle,
  //       parseFloat(customerId)
  //     );
  //     if (response2) {
  //       setGoogleCampaigns(response2);
  //       setCombinedCampaigns([...response2]);
  //       console.log(googleCampaigns);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const CreateAdsets = useCallback(
    (name1: string, value: string, name2: string, value2: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name1, value);
      params.set(name2, value2);

      return params.toString();
    },
    [searchParams]
  );

  const CreateAdgroups = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  return (
    <>
     {loader ? (
        <Container
          maxWidth={false}
          sx={{ display: "flex", width: "fit-content", mt: "20%" }}
        >
          <CircularProgress size={"70px"} />
        </Container>
      ) : 
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
          <Typography variant="h6" fontWeight={550} sx={{ ml: "15px", color: "darkblue" }}>
            Ad Campaigns
          </Typography>
          <div>
            <CreateCampaignDropdown />
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
              {combinedCampaigns?.map((data, key) => (
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
                      {data.type === "Facebook"
                        ? data.objective
                        : data.manualCpc}
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
                    {data.type === "Facebook" ? (
                      <Button
                        onClick={() => {
                          router.push(
                            "/adsets" +
                              "?" +
                              CreateAdsets(
                                "f_CampaignId",
                                data.campaignId,
                                "f_Objective",
                                data.objective ? data.objective : ""
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
                    ) : (
                      <Button
                        onClick={() => {
                          router.push(
                            "/ads/google" +
                              "?" +
                              CreateAdgroups("g_CampaignId", data.campaignId)
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
                    )}
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

export default Adcampaigns;