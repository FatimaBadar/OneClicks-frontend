"use client";
import React, { FormEvent, useState, useRef, useEffect } from "react";
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
} from "@mui/material";

import { Toast } from "primereact/toast";
import {
  AdGroupPayload,
  GeoTargeting,
  GoogleCampaign,
  Keywords,
  SearchAd,
} from "@/app/_models/Google.model";
import {
  CreateAdGroupService,
  GetAllGoogleCampaignsService,
} from "@/app/_services/googleService";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

const AdGroupForm = () => {
  const [campaignId, setCampaignId] = useState("");
  const [adGroupName, setAdGroupName] = useState("");
  const [adGroupBidAmount, setAdGroupBidAmount] = useState(20);
  const [adGroupStatus, setAdGroupStatus] = useState("");
  const [type, setType] = useState("");
  const [customizerAttributeName, setCustomizerAttributeName] = useState("");
  const [customizerAttributePrice, setCustomizerAttributePrice] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [negative, setNegative] = useState(Boolean);
  const [countryCode, setCountryCode] = useState("");
  const [cityName, setCityName] = useState<string[]>([]);

  const [campaignData, setCampaignData] = useState<GoogleCampaign[]>([]);

  const toast = useRef<Toast>(null);

  const showSuccessToast = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const showErrorToast = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error Message",
      detail: message,
      life: 3000,
    });
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);
  const getAllCampaigns = async () => {
    try {
      const accessTokengoogle =
        localStorage?.getItem("accesstoken_Google") ?? "";
      const customerId = localStorage?.getItem("g_managerId") ?? "";

      const response = await GetAllGoogleCampaignsService(
        accessTokengoogle,
        parseFloat(customerId)
      );
      if (response) {
        console.log(response);
        setCampaignData(response);
      }
    } catch (error) {
      showErrorToast("Error searching interests");
    }
  };

  const handleNextClick = async (e: FormEvent) => {
    e.preventDefault();

    const accessTokengoogle = localStorage?.getItem("accesstoken_Google") ?? "";
    const customerId = localStorage?.getItem("g_managerId") ?? "";

    const tempSearch: SearchAd = {
      customizerAttributeName,
      customizerAttributePrice,
      targetUrl,
    };

    const tempKeyword: Keywords = {
      keywords,
      negative,
    };

    const tempGeoTargeting: GeoTargeting = {
      countryCode,
      cityName,
    };

    const tempPayload: AdGroupPayload = {
      adGroupName,
      campaignId,
      adGroupBidAmount: adGroupBidAmount.toString(),
      adGroupStatus,
      searchAds: tempSearch,
      keywords: tempKeyword,
      geoTargeting: tempGeoTargeting,
      refreshToken: accessTokengoogle,
      customerId: parseFloat(customerId),
      type: "Google",
    };

    try {
      const response = await CreateAdGroupService(tempPayload);
      if (response.statusCode == "200") {
        showSuccessToast(response.message);
      }
      setAdGroupName("");
      setCampaignId("");
      setAdGroupBidAmount(0);
      setAdGroupStatus("");
    } catch (error) {
      showErrorToast("Could not create ad group");
      console.error(error);
    }
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
      <ThemeProvider theme={defaultTheme}>
        <Typography
          component="h2"
          sx={{ fontWeight: 700, color: "#272144", textAlign: "left" }}
        >
          Create an Ad Group
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
                  Ad Group Name
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  autoComplete="adGroupName"
                  value={adGroupName}
                  onChange={(e) => setAdGroupName(e.target.value)}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "5px",
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
                    aria-label="adGroupStatus"
                    name="adGroupStatus"
                    value={adGroupStatus}
                    onChange={(e) => setAdGroupStatus(e.target.value)}
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

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Cost Per Click Bid Amount
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="number"
                  variant="outlined"
                  autoFocus
                  autoComplete="adGroupBidAmount"
                  InputProps={{ inputProps: { min: 10 } }}
                  value={adGroupBidAmount}
                  onChange={(e) =>
                    setAdGroupBidAmount(parseFloat(e.target.value))
                  }
                  sx={{ display: "flex" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "5px",
                }}
              >
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Choose campaign
                </Typography>
                <Dropdown
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  options={campaignData.map((obj, index) => ({
                    label: `${obj.campaignName}`,
                    value: obj.campaignId,
                  }))}
                  className="w-full"
                  style={{
                    height: "32px",
                    width: "210px",
                    fontFamily:
                      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontSize: "1rem",
                    fontWeight: "200",
                    alignItems: "center",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
                    borderRadius: "4px",
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  }}
                  virtualScrollerOptions={{ itemSize: 38 }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Customizer Attribute Name
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  InputProps={{ inputProps: { min: 10 } }}
                  autoComplete="customizerAttributeName"
                  value={customizerAttributeName}
                  onChange={(e) => setCustomizerAttributeName(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item sm={12} md={6} lg={6} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Customizer Attribute Price Name
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  InputProps={{ inputProps: { min: 100000 } }}
                  autoComplete="customizerAttributePrice"
                  value={customizerAttributePrice}
                  onChange={(e) => setCustomizerAttributePrice(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Target Url
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  InputProps={{ inputProps: { min: 100000 } }}
                  autoComplete="targetUrl"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Keywords
                </Typography>

                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  InputProps={{ inputProps: { min: 100000 } }}
                  autoComplete="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "5px",
                }}
              >
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  City Name
                </Typography>
                <MultiSelect
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  // options={industrySearchData.map((obj, id) => ({
                  //   label: `${obj.name}`,
                  //   value: obj.id,
                  // }))}
                  className="w-full"
                  style={{
                    height: "32px",
                    width: "210px",
                    fontFamily:
                      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontSize: "1rem",
                    fontWeight: "200",
                    alignItems: "center",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
                    borderRadius: "4px",
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  }}
                  virtualScrollerOptions={{ itemSize: 38 }}
                />
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
  );
};

export default AdGroupForm;
