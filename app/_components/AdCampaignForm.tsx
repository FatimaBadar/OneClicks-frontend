"use client";
import React, { FormEvent, useState, useRef } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

import objectives from "@/public/jsonData/objectives.json";
import specialAdCategories from "@/public/jsonData/specialAdCategories.json";
import { Campaign } from "../_models/adAccount.model";
import { CreateCampaignService } from "../_services/adAccountService";
import { Toast } from "primereact/toast";
import Cookies from 'universal-cookie';

const AdCampaignForm = ({ onReturnObjective }: any) => {
  const [campaignName, setCampaignName] = useState("");
  const [objective, setObjective] = useState("");
  const [status, setStatus] = useState("");
  const [specialAdCategory, setSpecialAdCategory] = useState<string[]>([]);
  const toast = useRef<Toast>(null);
  const cookies = new Cookies();

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

  const handleNextClick = async (e: FormEvent) => {
    e.preventDefault();
    const tempCampaignData: Campaign = {
      campaignName: campaignName,
      objective: objective,
      status: status,
      specialAdCategories: specialAdCategory,
      accessToken: cookies.get('accesstoken'),
      ad_accountId: cookies.get('adAccountId')
    };
    console.log(tempCampaignData);

    try {
      const response = await CreateCampaignService(tempCampaignData);
      if (response.statusCode == "200") {
        cookies.set('campaignId', response.responseData.campaignId);
        onReturnObjective(objective);
        showSuccessToast(response.message);
      }

      setCampaignName("");
      setObjective("");
      setStatus("");
      setSpecialAdCategory([]);
    } catch (error) {
      showErrorToast("Could not create campaign");
      console.error(error);
    }
  };

  const handleSpecialAdCategoryChange = (
    event: SelectChangeEvent<typeof specialAdCategory>
  ) => {
    const {
      target: { value },
    } = event;
    setSpecialAdCategory(typeof value === "string" ? value.split(",") : value);
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
            <InputLabel>Objective</InputLabel>
            <Select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              label="Objective"
            >
              {objectives.map((obj, id) => (
                <MenuItem key={id} value={obj.codeWord}>
                  {obj.name} - {obj.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl component="fieldset" fullWidth margin="normal">
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

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Special Ad Category</InputLabel>
            <Select
              value={specialAdCategory}
              multiple
              onChange={handleSpecialAdCategoryChange}
              label="Special Ad Category"
            >
              {specialAdCategories.map((ads, id) => (
                <MenuItem key={id} value={ads.codeWord}>
                  {ads.name} - {ads.description}
                </MenuItem>
              ))}
            </Select>
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

export default AdCampaignForm;
