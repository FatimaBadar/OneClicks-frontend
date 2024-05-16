"use client";
import React, { FormEvent, useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
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

import {
  AdGroupPayload,
  GeoTargeting,
  GeoTargetingData,
  GoogleCampaign,
  Keywords,
  SearchAd,
} from "@/app/_models/Google.model";
import {
  CreateAdGroupService,
  GetAllGoogleCampaigns,
} from "@/app/_services/googleService";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import SuccessSnackbar from "../SuccessSnackbarComponent";
import FailureSnackbar from "../FailureSnackbarComponent";
// import geotargetingData as GeoTargetingData from '@/public/jsonData/GeoTargetGoogle.json';

const AdSearchForm = () => {
  const [campaignId, setCampaignId] = useState("");
  const [adGroupName, setAdGroupName] = useState("");
  const [adGroupBidAmount, setAdGroupBidAmount] = useState(20);
  const [adGroupStatus, setAdGroupStatus] = useState("");
  const [type, setType] = useState("");
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [headline0, setHeadline0] = useState<string>();
  const [headline1, setHeadline1] = useState<string>();
  const [headline2, setHeadline2] = useState<string>();

  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [description0, setDescription0] = useState<string>();
  const [description1, setDescription1] = useState<string>();
  const [path1, setPath1] = useState<string>("");
  const [path2, setPath2] = useState<string>("");
  const [targetUrl, setTargetUrl] = useState<string>("");

  const [keywords, setKeywords] = useState("");
  const [negative, setNegative] = useState(Boolean);
  const [countryCode, setCountryCode] = useState("");
  const [cityName, setCityName] = useState<string[]>([]);

  const [campaignData, setCampaignData] = useState<GoogleCampaign[]>([]);
  const [geotargetingData, setGeoTargetingdata] = useState<GeoTargetingData[]>([])
  const [filteredOptions, setFilteredOptions] = useState<GeoTargetingData[]>([]);

  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    getAllCampaigns();
  }, []);

  async function loadGeoTargetingData(): Promise<GeoTargetingData[]> {
    const response = await fetch('/jsonData/GeotargetingGoogle.json');
    if (!response.ok) {
        throw new Error('Failed to load geotargeting data');
    }
    return response.json();
}

  const getAllCampaigns = async () => {
    const geotargeting: GeoTargetingData[] = await loadGeoTargetingData();
    setGeoTargetingdata(geotargeting.sort())
    setFilteredOptions(geotargeting.sort())

    try {
      setLoader(true)
      const accessTokengoogle =
        localStorage?.getItem("accesstoken_Google") ?? "";
      const customerId = localStorage?.getItem("g_managerId") ?? "";

      const response = await GetAllGoogleCampaigns(
        accessTokengoogle,
        parseFloat(customerId)
      );
      if (response) {
        setCampaignData(response.responseData);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
    }
  };

  const handleNextClick = async (e: FormEvent) => {
    e.preventDefault();

    const accessTokengoogle = localStorage?.getItem("accesstoken_Google") ?? "";
    const managerId = localStorage?.getItem("g_managerId") ?? "";
    const customerId = localStorage?.getItem("g_clientId") ?? "";

    headlines.push(headline0 ?? "")
    headlines.push(headline1 ?? "")
    headlines.push(headline2 ?? "")

    descriptions.push(description0 ?? "")
    descriptions.push(description1 ?? "")

    const tempSearch: SearchAd = {
      targetUrl,
      headlines,
      descriptions,
      path1: path1 ?? "",
      path2: path2 ?? "",
    };

    const tempKeyword: Keywords = {
      keywords,
      negative,
    };

    const tempCityName: string[] = geotargetingData.filter(x => x.CountryCode == countryCode)?.map(x=>x.Name) ?? ""
    const tempCountryCode: string = geotargetingData.find(x => cityName.includes(x.Name))?.CountryCode ?? "";
//    .map(x=>x.CountryCode) ?? "" 
 
    const tempGeoTargeting: GeoTargeting = {
      countryCode: tempCountryCode,
      cityName,
    };

    const tempCampaignName: string = campaignData.find(x => x.campaignId == campaignId)?.campaignName ?? "" 

    const tempPayload: AdGroupPayload = {
      adGroupName,
      campaignId: parseFloat(campaignId),
      campaignName: tempCampaignName,
      adGroupBidAmount: adGroupBidAmount.toString(),
      adGroupStatus,
      searchAds: tempSearch,
      keywords: tempKeyword,
      geoTargeting: tempGeoTargeting,
      refreshToken: accessTokengoogle,
      customerId: parseFloat(customerId),
      managerId: parseFloat(managerId),
      type: "Google",
    };

    try {
      setLoader(true)
      const response = await CreateAdGroupService(tempPayload);
      if (response.statusCode == "200") {

        setLoader(false)
        setSuccess(true);
        setMessage("Successfully created Ad!"); 
            }
      setAdGroupName("");
      setCampaignId("");
      setAdGroupBidAmount(0);
      setAdGroupStatus("");
    } catch (error) {
      setLoader(false)
      setSuccess(false);
      setMessage("Failed to create ad");   
      console.error(error);
    }
  };

  const handleSelectChange = (selectedCityNames: string[]) => {
    setCityName(selectedCityNames);
    const selectedCityCountryCode = geotargetingData.find(city => city.Name === selectedCityNames[0])?.CountryCode ?? "";
  
    const filteredCities = geotargetingData.filter(city => city.CountryCode === selectedCityCountryCode);
    setFilteredOptions(filteredCities);
  
    setCountryCode(selectedCityCountryCode);
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
          component="h2"
          sx={{ fontWeight: 700, color: "#272144", textAlign: "left" }}
        >
          Create an Ad
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
            <Grid item sm={12} md={4} lg={4} xs={12}>
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

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center", width: "150px" }}>
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
                      value="Enabled"
                      control={<Radio />}
                      label="Enabled"
                    />
                    <FormControlLabel
                      value="Paused"
                      control={<Radio />}
                      label="Paused"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>

            <Grid item sm={12} md={4} lg={4} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  HeadLine 1
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  autoComplete="headline0"
                  value={headline0}
                  onChange={(e) => setHeadline0(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
         Headline 2
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  autoComplete="headline1"
                  value={headline1}
                  onChange={(e) => setHeadline1(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                Headline 3
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  autoComplete="headline2"
                  value={headline2}
                  onChange={(e) => setHeadline2(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  Description 1
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  autoComplete="description0"
                  value={description0}
                  onChange={(e) => setDescription0(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                Description 1
                </Typography>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  autoComplete="adGroupName"
                  value={description1}
                  onChange={(e) => setDescription1(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item sm={12} md={4} lg={4} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
         Path 1 
                </Typography>
                <TextField
                  size="small"
                  margin="dense"                  
                  type="text"
                  variant="outlined"
                  autoFocus
                  autoComplete="path1"
                  value={path1}
                  onChange={(e) => setPath1(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
             Path 2
                </Typography>
                <TextField
                  size="small"
                  margin="dense"                
                  type="text"
                  variant="outlined"
                  autoFocus
                  InputProps={{ inputProps: { min: 100000 } }}
                  autoComplete="path2"
                  value={path2}
                  onChange={(e) => setPath2(e.target.value)}
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
                  options={geotargetingData.map((obj, id) => ({
                    label: `${obj.Name}`,
                    value: obj.Name,
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
                  Negative
                </Typography>
                <FormControl
                  component="fieldset"
                  variant="outlined"
                  margin="dense"
                  size="small"
                >
                  <RadioGroup
                    row
                    aria-label="Negative"
                    name="negative"
                    value={negative}
                    onChange={(e) =>
                      setNegative(e.target.value === "true" ? true : false)
                    }
                    sx={{ justifyContent: "center", height: "15px" }}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="True"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="False"
                    />
                  </RadioGroup>
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

export default AdSearchForm;
