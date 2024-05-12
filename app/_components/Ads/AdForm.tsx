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

const AdForm = () => {
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
    getAdsDropdownData();
  }, []);

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

  const getAdsDropdownData = async () => {
    try {
      const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
      const adaccountId = localStorage?.getItem("adAccountId") ?? "";

      const response = await getAllAdsPayloadService(
        adaccountId.toString(),
        accessTokenfb
      );
      if (response.statusCode == "200") {
        console.log(response.responseData);
        setCampaignData(response.responseData.campaignData);
        setAdsetData(response.responseData.adSetData);
        setCreativeData(response.responseData.adCreativeData);
      }
    } catch (error) {
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
      type: "Facebook"
    };

    try {
      const response = await ScheduleAdService(tempPayload);
      if (response.statusCode == "200") {
        showSuccessToast(response.message);
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
      showErrorToast("Could not schedule ad");
      console.error(error);
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
      <ThemeProvider theme={defaultTheme}>
        <Typography
          component="h2"
          sx={{ fontWeight: 700, color: "#272144", textAlign: "left" }}
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
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                  {" "}
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

              <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "baseline"}}>
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
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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

              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
                    {adsetData
                      .filter((obj) => obj.campaignId === campaignId)
                      .map((obj) => (
                        <MenuItem key={obj.id} value={obj.id}>
                          {obj.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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

            {/* <Grid container>
            <Grid item xs={12}>
              <Grid container sx={{ display: "flex" }}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "grid", alignItems: "center" }}
                >
                  <Typography sx={{ fontWeight: 600 }}>Ad Name</Typography>
                  <Typography sx={{ fontWeight: 600 }}>Status</Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "grid", justifyContent: "center" }}
                >
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
                </Grid>
              </Grid>
            </Grid> */}

            {/* <Grid item xs={12} md={6}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "grid", alignItems: "center" }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    Select Campaign
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>Select Adset</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Select Creative
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "grid", justifyContent: "center" }}
                >
                  <FormControl variant="outlined" margin="dense">
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

                  <FormControl variant="outlined" margin="dense">
                    <Select
                      value={adsetId}
                      onChange={handleAdsetData}
                      sx={{ height: "32px" }}
                    >
                      {adsetData
                        .filter((obj) => obj.campaignId === campaignId)
                        .map((obj) => (
                          <MenuItem key={obj.id} value={obj.id}>
                            {obj.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <FormControl variant="outlined" margin="dense">
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
            </Grid> */}
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default AdForm;
