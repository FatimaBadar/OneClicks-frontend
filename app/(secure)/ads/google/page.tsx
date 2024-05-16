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
  Container,
  CircularProgress,
} from "@mui/material";
import Navbar from "@/app/_components/Navbar/Navbar";
import AdSearchForm from "@/app/_components/GoogleAds/AdSearchForm";
import { GetAllAdsService } from "@/app/_services/googleService";
import { AdGroup } from "@/app/_models/Google.model";
import { useSearchParams } from "next/navigation";
import SuccessSnackbar from "@/app/_components/SuccessSnackbarComponent";
import FailureSnackbar from "@/app/_components/FailureSnackbarComponent";

const Facebook = "rgb(19, 222, 185)";
const Instagram = "rgb(250, 137, 107)";
const Google = "rgb(73, 190, 255)";

const AdGroupPage = () => {
  const searchParams = useSearchParams();
  const [googleAds, setGoogleAds] = useState<AdGroup[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    getAds();
  }, []);
  var g_CampaignId: string | null = searchParams.get("g_CampaignId");
  if (g_CampaignId == null) g_CampaignId = "";

  const getAds = async () => {
    setLoader(true)
    try {
      const accessTokengoogle =
        localStorage?.getItem("accesstoken_Google") ?? "";
      const customerId = localStorage?.getItem("g_managerId") ?? "";
      const clientId = localStorage?.getItem("g_clientId") ?? "";

      const response = await GetAllAdsService(
        accessTokengoogle,
        parseFloat(clientId),
        parseFloat(customerId)
      );
      if (response.statusCode == "200") {
        setGoogleAds(response.responseData);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
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
      <Box sx={{ mt: 10, ml: 10, mr: 10 }}>
      {g_CampaignId ? <AdSearchForm /> : ""}
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
          <Typography variant="h6" fontWeight={550} sx={{ ml: "15px", color: "darkblue"  }}>
            Google Ads
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

                <TableCell>
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
                      {data.adGroupName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {data.headlines.map((headline, index) => (
                        <React.Fragment key={index}>
                          {headline.text}
                          <br />
                        </React.Fragment>
                      ))}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {/* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    > */}
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={600}
                      >
                         {data.descriptions.map((description, index) => (
                        <React.Fragment key={index}>
                          {description.text}
                          <br />
                        </React.Fragment>
                      ))}
                      </Typography>
                    {/* </Box> */}
                  </TableCell>

                  <TableCell width={"200px"}>
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

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        // alignItems: "center",
                        width: "100px"
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
      }
      {success ? <SuccessSnackbar openBar={success} message={message} /> : ""}
      {failure ? <FailureSnackbar openBar={failure} message={message} /> : ""}
    </>
  );
};

export default AdGroupPage;
