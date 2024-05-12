"use client";
import React, { FormEvent, useState, useRef } from "react";
import Select  from "@mui/material/Select";

import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  createTheme,
  ThemeProvider,
  FormLabel,
} from "@mui/material";

import { CreateAdcampaignService } from "@/app/_services/googleService";
import { CampaignPayload } from "@/app/_models/Google.model";

const GoogleAdCampaignForm = ({ onReturn }: any) => {
  const [campaignName, setCampaignName] = useState("");
  const [advertisingChannelType, setAvertisingChannelType] = useState("");
  const [targetGoogleSearch, setTargetGoogleSearch] = useState<
    boolean | null
  >();
  const [targetSearchNetwork, setTargetSearchNetwork] = useState<
    boolean | null
  >();
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const advertisingChannelTypeDropdown = [
    "DISCOVERY",
    "DISPLAY",
    "HOTEL",
    "LOCAL",
    "LOCAL_SERVICES",
    "MULTI_CHANNEL",
    "PERFORMANCE_MAX",
    "SEARCH",
    "SHOPPING",
    "SMART",
    "TRAVEL",
    "UNKNOWN",
    "UNSPECIFIED",
    "VIDEO",
  ];

  const handleNextClick = async (e: FormEvent) => {
    e.preventDefault();

    const accessTokengoogle = localStorage?.getItem("accesstoken_Google") ?? "";
    const customerId = localStorage?.getItem("selectedManagerId") ?? "";

    const tempCampaignData: CampaignPayload = {
      campaignName,
      advertisingChannelType,
      targetGoogleSearch: targetGoogleSearch ? targetGoogleSearch : false,
      targetSearchNetwork: targetSearchNetwork ? targetSearchNetwork : false,
      budget,
      status,
      startDate,
      endDate,
      refreshToken: accessTokengoogle,
      customerId: customerId,
      type: "Google",
    };
    console.log(tempCampaignData);

    try {
      const response = await CreateAdcampaignService(
        accessTokengoogle,
        customerId.toString()
      );
      if (response.statusCode == "200") {
        console.log(response.responseData);
        //setCampaigns(response.responseData);
        onReturn(true);
      }
      setCampaignName("");
      setAvertisingChannelType("");
      setTargetGoogleSearch(null);
      setTargetSearchNetwork(null);
      setBudget("");
      setEndDate("");
      setStartDate("");
      setStatus("");
    } catch (error) {
      onReturn(false);
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
        <Box
          component="form"
          onSubmit={handleNextClick}
          sx={{
            width: "100%",
            mt: 3,
            textAlign: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            label="Campaign Name"
            type="text"
            variant="outlined"
            autoFocus
            autoComplete="username"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            sx={{ display: "flex" }}
            // focused
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Advertising Channel Type</InputLabel>
            <Select
              value={advertisingChannelType}
              onChange={(e) => setAvertisingChannelType(e.target.value)}
              label="Objective"
            >
              {advertisingChannelTypeDropdown.map((obj, id) => (
                <MenuItem key={id} value={obj}>
                  {obj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>



          <TextField
            margin="normal"
            required
            label="Budget"
            type="number"
            variant="outlined"
            autoFocus
            autoComplete="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            sx={{ display: "flex" }}
            // focused
          />

          <TextField
            margin="normal"
            required
            label="Start Date"
            type="date"
            variant="outlined"
            autoFocus
            autoComplete="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ display: "flex" }}
            // focused
          />
          <TextField
            margin="normal"
            required
            label="End Date"
            type="date"
            variant="outlined"
            autoFocus
            autoComplete="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ display: "flex" }}
            // focused
          />

          <FormControl component="fieldset" fullWidth margin="normal"
          sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Target Google Search
            </FormLabel>
            <RadioGroup
              row
              aria-label="targetGoogleSearch"
              name="status"
              value={targetGoogleSearch}
              onChange={(e) => setTargetGoogleSearch(e.target.value === 'true')}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="True"
                sx={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" fullWidth margin="normal"
          sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Target Search Network
            </FormLabel>
            <RadioGroup
              row
              aria-label="targetSearchNetwork"
              name="status"
              value={targetSearchNetwork}
              onChange={(e) => setTargetSearchNetwork(e.target.value === 'true')}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="True"
                sx={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
          
          <FormControl component="fieldset" fullWidth margin="normal" 
          sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Status
            </FormLabel>
            <RadioGroup
              row
              aria-label="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel
                value="ACTIVE"
                control={<Radio />}
                label="Active"
                sx={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value="PAUSED"
                control={<Radio />}
                label="Paused"
              />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              width: "100%",
              display: "flex",
              backgroundColor: "#597FB5 !important",
              color: "#fff !important",
              "&:hover": {
                backgroundColor: "#405D80 !important",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default GoogleAdCampaignForm;
