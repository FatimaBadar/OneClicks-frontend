"use client";
import React, { FormEvent, useState, useRef } from "react";
import Select from "@mui/material/Select";

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
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Container,
  CircularProgress,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CreateAdcampaignService } from "@/app/_services/googleService";
import { CampaignPayload } from "@/app/_models/Google.model";
import { ScrollPanel } from "primereact/scrollpanel";
import SuccessSnackbar from "../SuccessSnackbarComponent";
import FailureSnackbar from "../FailureSnackbarComponent";
import { useRouter } from "next/navigation";

const GoogleAdCampaignForm = ({ onReturn }: any) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter()

  const [campaignName, setCampaignName] = useState("");
  const [advertisingChannelType, setAvertisingChannelType] = useState("");
  const [targetGoogleSearch, setTargetGoogleSearch] = useState<
    boolean | null
  >();
  const [targetSearchNetwork, setTargetSearchNetwork] = useState<
    boolean | null
  >();
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(10);
  const [budgetDeliveryMethod, setBudgetDeliveryMethod] = useState("");

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
  const DeliveryMethodOptions = ["Standard", "Accelerated"];

  function convertDateFormat(currentDate: Date){
    var convertedDate = currentDate.getFullYear().toString() + "-" +
              (currentDate.getMonth() + 1).toString().padStart(2, '0') + "-" +
              currentDate.getDate().toString().padStart(2, '0');
    return convertedDate
  }

  const handleNextClick = async (e: FormEvent) => {
    e.preventDefault();

    const accessTokengoogle = localStorage?.getItem("accesstoken_Google") ?? "";
    const managerId = localStorage?.getItem("g_ManagerId") ?? "";
    const customerId = localStorage?.getItem("g_ClientId") ?? "";

    const tempCampaignData: CampaignPayload = {
      campaignName,
      advertisingChannelType,
      targetGoogleSearch: targetGoogleSearch ? targetGoogleSearch : false,
      targetSearchNetwork: targetSearchNetwork ? targetSearchNetwork : false,
      budgetName,
      budgetAmount: budgetAmount.toString(),
      budgetDeliveryMethod,
      status,
      startDate: convertDateFormat(new Date(startDate)) ,
      endDate: convertDateFormat(new Date(endDate)),
      refreshToken: accessTokengoogle,
      customerId: parseFloat(customerId),
      managerId: parseFloat(managerId),
      type: "Google",
    };
    console.log(tempCampaignData);

    try {
      setLoader(true)
      const response = await CreateAdcampaignService(tempCampaignData);
      if (response.statusCode == "200") {
        setLoader(false)
        setSuccess(true);
        setMessage("Successfully created campaign!");
                //setCampaigns(response.responseData);
        onReturn(true);
        router.refresh()
      }
      setCampaignName("");
      setAvertisingChannelType("");
      setTargetGoogleSearch(null);
      setTargetSearchNetwork(null);
      setBudgetAmount(0);
      setBudgetDeliveryMethod("")
      setBudgetName("")
      setEndDate("");
      setStartDate("");
      setStatus("");
    } 
    catch (error) {
      setLoader(false)
      setSuccess(false);
      setMessage("Failed to create campaign");    
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
            autoComplete="campaignName"
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
              label="Advertising Channel Type"
            >
               {/* <ScrollPanel> */}
              {advertisingChannelTypeDropdown.map((obj, id) => (
                <MenuItem key={id} value={obj}
                sx={{ width: "200px", height: "15px", fontSize: "small" }}
                >
                  {obj}
                </MenuItem>
              ))}
              {/* </ScrollPanel> */}
            </Select>
          </FormControl>

          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>Set Budget</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                margin="normal"
                required
                label="Name"
                type="text"
                variant="outlined"
                autoFocus
                autoComplete="budgetName"
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
                sx={{ display: "flex" }}
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Budget Delivery Method</InputLabel>
                <Select
                  value={budgetDeliveryMethod}
                  onChange={(e) => setBudgetDeliveryMethod(e.target.value)}
                  label="Budget Delivery Method"
                >
                  {DeliveryMethodOptions.map((obj, id) => (
                    <MenuItem key={id} value={obj}
                    sx={{ width: "200px", height: "15px", fontSize: "small" }}
                    >
                      {obj}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                label="Budget Amount"
                type="number"
                variant="outlined"
                autoFocus
                autoComplete="budgetAmount"
                InputProps={{ inputProps: { min: 10} }}
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(parseFloat(e.target.value))}
                sx={{ display: "flex" }}
                // focused
              />
            </AccordionDetails>
          </Accordion>

          <TextField
            margin="normal"
            required
            // label="Start Date"
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
            // label="End Date"
            type="date"
            variant="outlined"
            autoFocus
            autoComplete="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ display: "flex" }}
            // focused
          />
          <Typography sx={{color: "darkblue"}}>Note: This campaign will be created as Manual CPC (Cost Per Click)</Typography>

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
              Target Google Search
            </FormLabel>
            <RadioGroup
              row
              aria-label="targetGoogleSearch"
              name="status"
              value={targetGoogleSearch}
              onChange={(e) => setTargetGoogleSearch(e.target.value === "true")}
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
              Target Search Network
            </FormLabel>
            <RadioGroup
              row
              aria-label="targetSearchNetwork"
              name="status"
              value={targetSearchNetwork}
              onChange={(e) =>
                setTargetSearchNetwork(e.target.value === "true")
              }
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

export default GoogleAdCampaignForm;
