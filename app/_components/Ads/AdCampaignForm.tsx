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
  Divider,
  Container,
  CircularProgress,
} from "@mui/material";

import objectives from "@/public/jsonData/objectives.json";
import specialAdCategories from "@/public/jsonData/specialAdCategories.json";
import { CampaignPayload } from "../../_models/adAccount.model";
import { CreateCampaignService } from "../../_services/adAccountService";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { ScrollPanel } from "primereact/scrollpanel";
import SuccessSnackbar from "../SuccessSnackbarComponent";
import FailureSnackbar from "../FailureSnackbarComponent";

const AdCampaignForm = ({ onReturn }: any) => {
  const [campaignName, setCampaignName] = useState("");
  const [objective, setObjective] = useState("");
  const [status, setStatus] = useState("");
  const [specialAdCategory, setSpecialAdCategory] = useState<string[]>([]);

  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleNextClick = async (e: FormEvent) => {
    e.preventDefault();

    const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
    const adaccountId = localStorage?.getItem("adAccountId") ?? "";

    const tempCampaignData: CampaignPayload = {
      campaignName: campaignName,
      objective: objective,
      status: status,
      specialAdCategories: specialAdCategory,
      accessToken: accessTokenfb,
      adAccountId: adaccountId.toString(),
      type: "Facebook",
    };
    console.log(tempCampaignData);

    try {
      setLoader(true);
      const response = await CreateCampaignService(tempCampaignData);
      if (response.statusCode == "200") {
        localStorage.setItem("campaignId", response.responseData.campaignId);
        setLoader(false)
        setSuccess(true);
        setMessage("Successfully created campaign!");
        onReturn(true);
      }

      setCampaignName("");
      setObjective("");
      setStatus("");
      setSpecialAdCategory([]);
    } catch (error) {
      setLoader(false)
      setSuccess(false);
      setMessage("Failed to create campaign.");

      onReturn(false);
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
            {/* <Box sx={{display: "flex",  flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",}}>
            <Dropdown
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              options={objectives.map((obj, id) => ({
                label: `${obj.name} - ${obj.description}`,
                value: obj.codeWord,
              }))}
              placeholder="Objective"
              className="w-full"
              style={{
                height: "45px",
                width: "100%",
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
          </Box> */}
            <InputLabel>Objective</InputLabel>

            <Select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              label="Objective"
            >
              {/* <ScrollPanel> */}
              {objectives.map((obj, id) => (
                <MenuItem
                  key={id}
                  value={obj.codeWord}
                  sx={{ width: "200px", height: "35px", fontSize: "small" }}
                >
                  {obj.name} - "{obj.description}"
                </MenuItem>
              ))}
              {/* </ScrollPanel> */}
            </Select>
          </FormControl>

          <FormControl
            component="fieldset"
            fullWidth
            margin="normal"
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
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
              onChange={handleSpecialAdCategoryChange}
              multiple
              label="Special Ad Category"
            >
              {/* <ScrollPanel> */}
              {specialAdCategories.map((ads, id) => (
                <MenuItem
                  key={id}
                  value={ads.codeWord}
                  sx={{ width: "200px", height: "15px", fontSize: "small" }}
                >
                  {ads.name} - "{ads.description}"
                </MenuItem>
              ))}
              {/* </ScrollPanel> */}
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
            Create
          </Button>
        </Box>
      </ThemeProvider>
      </>
      }
      {success ? <SuccessSnackbar openBar={success} message={message} /> : ""}
      {failure ? <FailureSnackbar openBar={failure} message={message} /> : ""}
    </>
  );
};

export default AdCampaignForm;
