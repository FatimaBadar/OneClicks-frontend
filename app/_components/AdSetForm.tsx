"use client";
import React, { FormEvent, useState, useRef, ChangeEvent } from "react";
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
import Cookies from 'universal-cookie';

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import dayjs, { Dayjs } from "dayjs";

import objectives from "@/public/jsonData/objectives.json";
import optimization from "@/public/jsonData/optimization_goals.json";
import billingEvents from "@/public/jsonData/billing_event.json";
import countries from "@/public/jsonData/countries.json";

import { Adset } from "../_models/adAccount.model";
import { CreateAdsetService } from "../_services/adAccountService";

import { Toast } from "primereact/toast";

const AdsetForm = ({ selectedObjective }: { selectedObjective: string }) => {
  const [adsetName, setAdsetName] = useState("");
  // const [conversionLocation, setConversionLocation] = useState("");
  // const [performanceGoal, setPerformanceGoal] = useState("");
  const [optimizationGoal, setOptimizationGoal] = useState("");
  const [billingEvent, setBillingEvent] = useState("");
  const [bidAmount, setBidAmount] = useState(0);
  const [dailyBudget, setDailyBudget] = useState(0);
  // const [geolocations, setGeolocations] = useState([]);
  const [geolocations, setGeolocations] = useState<string[]>([]);

  const [interests, setInterests] = useState("");
  const [startTime, setStartTime] = useState("");
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  // const [startTime, setStartTime] =   useState<Dayjs | null>(null);
  const [status, setStatus] = useState("");

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

  // console.log("check", selectedObjective);
  const handleNextClick = async (e: FormEvent) => {
    e.preventDefault();
    const tempAdSetData: Adset = {
      campaignId: cookies.get('campaignId'),
      adsetName,
      optimizationGoal,
      billingEvent,
      bidAmount,
      dailyBudget,
      geolocations,
      interests,
      startTime,
      status,
      accessToken: cookies.get('accesstoken')
    };
    console.log(tempAdSetData);

    try {
      const response = await CreateAdsetService(tempAdSetData);
      if (response.statusCode == "200") {
        showSuccessToast(response.message);
      }

      setAdsetName("");
      setOptimizationGoal("");
      setBillingEvent("");
      setBidAmount(0),
      setDailyBudget(0),
      setGeolocations([]),
      setInterests(""),
      setStartTime(""),
      setStatus("");
    } catch (error) {
      showErrorToast("Could not create campaign");
      console.error(error);
    }
  };

  const handleGeolocations = (
    event: SelectChangeEvent<typeof geolocations>
  ) => {
    const {
      target: { value },
    } = event;
    setGeolocations(typeof value === "string" ? value.split(",") : value);
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
            label="Adset Name"
            type="text"
            variant="outlined"
            autoFocus
            autoComplete="adsetName"
            value={adsetName}
            onChange={(e) => setAdsetName(e.target.value)}
            sx={{ display: "flex" }}
            // focused
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Optimization Goal</InputLabel>
            <Select
              value={optimizationGoal}
              onChange={(e) => setOptimizationGoal(e.target.value)}
              label="Optimization Goal"
            >
              {optimization
                .find((obj) => obj.codeWord === selectedObjective)
                ?.["optimizationGoal"].map((goal, index) => (
                  <MenuItem key={index} value={goal.codeWord}>
                    {goal.codeWord} - {goal.description}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Billing Event</InputLabel>
            <Select
              value={billingEvent}
              onChange={(e) => setBillingEvent(e.target.value)}
              label="Billing Event"
            >
              {billingEvents.map((obj, id) => (
                <MenuItem key={id} value={obj.codeWord}>
                  {obj.codeWord} - {obj.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            label="Bid Amount"
            type="number"
            variant="outlined"
            autoFocus
            autoComplete="bidAmount"
            value={bidAmount}
            onChange={(e) => setBidAmount(parseFloat(e.target.value))}
            sx={{ display: "flex" }}
            // focused
          />
          <TextField
            margin="normal"
            required
            label="Daily Budget"
            type="number"
            variant="outlined"
            autoFocus
            autoComplete="dailyBudget"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(parseFloat(e.target.value))}
            sx={{ display: "flex" }}
            // focused
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Geolocations</InputLabel>
            <Select
              value={geolocations}
              onChange={handleGeolocations}
              label="Geolocations"
            >
              {countries.map((obj, id) => (
                <MenuItem key={id} value={obj.name}>
                  {obj.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            label="Interests"
            type="text"
            variant="outlined"
            autoFocus
            autoComplete="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            sx={{ display: "flex" }}
            // focused
          />

          <TextField
            margin="normal"
            required
            label="Start Time"
            type="datetime-local"
            variant="outlined"
            autoFocus
            autoComplete="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            sx={{ display: "flex" }}
            // focused
          />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue: Dayjs | null) => setValue(newValue)}
            />
          </LocalizationProvider> */}

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

export default AdsetForm;
