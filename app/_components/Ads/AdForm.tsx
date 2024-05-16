"use client";
import React, { FormEvent, useState, useRef, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Button,
  TextField,
  FormControl,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  createTheme,
  ThemeProvider,
  Typography,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";

import { Toast } from "primereact/toast";
import {
  Ads,
  AdsetData,
  CampaignData,
  CreativeData,
} from "@/app/_models/adAccount.model";
import {
  ScheduleAdService,
  getAllAdsPayloadService,
} from "@/app/_services/adAccountService";
import { useSearchParams } from "next/navigation";
import SuccessSnackbar from "../SuccessSnackbarComponent";
import FailureSnackbar from "../FailureSnackbarComponent";

const AdForm = () => {
  const searchParams = useSearchParams();
  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");


  const [adName, setAdName] = useState("");
  const [campaignData, setCampaignData] = useState<CampaignData[]>([]);
  const [adsetData, setAdsetData] = useState<AdsetData[]>([]);
  const [creativeData, setCreativeData] = useState<CreativeData[]>([]);

  const [campaignId, setCampaignId] = useState("");
  const [campaignName, setCampaignName] = useState("");

  const [adsetId, setAdsetId] = useState("");
  const [adsetName, setAdsetName] = useState("");

  const [creativeId, setCreativeId] = useState("");
  const [creativeName, setCreativeName] = useState("");
  const [status, setStatus] = useState("");

  const toast = useRef<Toast>(null);

  useEffect(() => {

    var f_AdsetId: string | null = searchParams.get("f_AdsetId");
    if (f_AdsetId == null) f_AdsetId = "";
    else
    setAdsetId(f_AdsetId)
  
    var f_CreativeId: string | null = searchParams.get("f_CreativeId");
    if (f_CreativeId == null) f_CreativeId = "";
    else 
    setCreativeId(f_CreativeId)

    var f_CampaignId: string | null = searchParams.get("f_CampaignId");
    if (f_CampaignId == null) f_CampaignId = "";
    else
    setCampaignId(f_CampaignId)

    getAdsDropdownData();
  }, []);

  const getAdsDropdownData = async () => {
    try {
      setLoader(true)
      const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
      const adaccountId = localStorage?.getItem("adAccountId") ?? "";

      const response = await getAllAdsPayloadService(
        adaccountId.toString(),
        accessTokenfb
      );
      if (response.statusCode === "200") {
        console.log(response.responseData);
        setCampaignData(response.responseData.campaignData);
        setCreativeData(response.responseData.adCreativeData);
        console.log(response.responseData.adSetData);
        setAdsetData(response.responseData.adSetData);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.error(error);
    }
  };

  const handleNextClick = async (e: FormEvent) => {
    e.preventDefault();

    const selectedAdsetName = adsetData.find((x) => x.id == adsetId)?.name;
    const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
    const adaccountId = localStorage?.getItem("adAccountId") ?? "";

    const tempPayload: Ads = {
      adName,
      adsetId,
      adsetName: selectedAdsetName ?? "",
      creativeId,
      status,
      accessToken: accessTokenfb,
      adAccountId: adaccountId.toString(),
      type: "Facebook",
    };

    try {
      setLoader(true)
      const response = await ScheduleAdService(tempPayload);
      if (response.statusCode == "200") {
        setLoader(false)
        setSuccess(true);
        setMessage("Successfully scheduled ad!");
      }
      setAdName("");
      setAdsetName("");
      setAdsetId("");
      setCreativeId("");
      setCreativeName("");
      setCampaignName("");
      setCampaignId("");
      setStatus("");
    } catch (error) {
      setLoader(false)
      setSuccess(false);
      setMessage("Failed to schedule ad.");
    }
  };

  const handleCampaignData = (event: SelectChangeEvent<string>) => {
    setCampaignId(event.target.value);
  };

  const handleAdsetData = (event: SelectChangeEvent<string>) => {
    setAdsetId(event.target.value);
  };

  const handleCreativeData = (event: SelectChangeEvent<string>) => {
    setCreativeId(event.target.value);
  };

  const defaultTheme = createTheme({
    typography: {
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            width: "100%",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
            borderRadius: "8px",
            "& .MuiInputLabel-root": {
              transform: "translateY(50%)",
            },
          },
          input: {
            borderRadius: "50%",
            height: "15px",
          },
        },
      },
    },
  });

  return (
    <>
         {loader ? (
        <Container
          maxWidth={false}
          sx={{ display: "flex", width: "fit-content", mt: "20%" }}
        >
          <CircularProgress  />
        </Container>
      ) : 
        <>
      <ThemeProvider theme={defaultTheme}>
        <Typography
          variant="h5"
          fontWeight={550}
          marginBottom={2}
          sx={{
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            fontSize: "1.75rem",
            color: "darkblue",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Create an ad
        </Typography>

        <Box
          component="form"
          onSubmit={handleNextClick}
          sx={{
            width: "100%",
            mt: 3,
            display: "flex",
          }}
        >
          <Grid container spacing={2} columns={12}>
            <Grid item sm={12} md={6} lg={6} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Ad Name
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  autoComplete="adName"
                  value={adName}
                  onChange={(e) => setAdName(e.target.value)}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Status
                </Typography>
                <FormControl
                  component="fieldset"
                  variant="outlined"
                  margin="dense"
                  size="small"
                >
                  <RadioGroup
                    row
                    aria-label="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{ justifyContent: "center", height: "15px" }}
                  >
                    <FormControlLabel
                      value="ACTIVE"
                      control={<Radio />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="PAUSED"
                      control={<Radio />}
                      label="Paused"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>

            <Grid item sm={12} md={6} lg={6} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Select Campaign
                </Typography>
                <FormControl
                  variant="outlined"
                  margin="dense"
                  sx={{ width: "35%" }}
                >
                  <Select
                    value={campaignId}
                    onChange={handleCampaignData}
                    sx={{ height: "32px" }}
                  >
                    {campaignData.map((obj, id) => (
                      <MenuItem key={id} value={obj.id}>
                        {obj.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Select Adset
                </Typography>
                <FormControl
                  variant="outlined"
                  margin="dense"
                  sx={{ width: "35%" }}
                >
                  <Select
                    value={adsetId}
                    onChange={handleAdsetData}
                    sx={{ height: "32px" }}
                  >
                    {campaignId === "" ? (
                      <Typography>Select a campaign first</Typography>
                    ) : (
                      adsetData
                        .filter((obj) => obj.campaignId === campaignId)
                        .map((obj) => (
                          <MenuItem key={obj.id} value={obj.id}>
                            {obj.name}
                          </MenuItem>
                        ))
                    )}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Select Creative
                </Typography>
                <FormControl
                  variant="outlined"
                  margin="dense"
                  sx={{ width: "35%" }}
                >
                  <Select
                    value={creativeId}
                    onChange={handleCreativeData}
                    sx={{ height: "32px" }}
                  >
                    {creativeData.map((obj, id) => (
                      <MenuItem key={id} value={obj.id}>
                        {obj.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                width: "50%",
                alignItems: "right",
                display: "flex",
                backgroundColor: "#597FB5 !important",
                color: "#fff !important",
                "&:hover": {
                  backgroundColor: "#405D80 !important",
                },
              }}
            >
              Create
            </Button>
          </Grid>
        </Box>
      </ThemeProvider>
      </>
      }
      {success ? <SuccessSnackbar openBar={success} message={message} /> : ""}
      {failure ? <FailureSnackbar openBar={failure} message={message} /> : ""}
    </>
  );
};

export default AdForm;
