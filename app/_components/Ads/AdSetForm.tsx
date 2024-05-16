"use client";
import React, { FormEvent, useState, useRef } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  IconButton,
  Container,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import optimization from "@/public/jsonData/optimization_goals.json";
import billingEvents from "@/public/jsonData/billing_event.json";
import {
  AdTargetingCategory,
  AdsetPayload,
  Cities,
  GeoLocation,
  Interest,
  LocationData,
} from "../../_models/adAccount.model";
import {
  CreateAdsetService,
  GetCitySearchData,
  GetIndustrySearchData,
  GetInterestsSearchData,
} from "../../_services/adAccountService";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import SuccessSnackbar from "../SuccessSnackbarComponent";
import FailureSnackbar from "../FailureSnackbarComponent";

interface AdSetProps {
  campaign: string;
  objective: string;
}
const AdsetForm: React.FC<AdSetProps> = ({ campaign, objective }) => {
  const [adsetName, setAdsetName] = useState("");
  const [optimizationGoal, setOptimizationGoal] = useState("");
  const [billingEvent, setBillingEvent] = useState("");
  const [bidAmount, setBidAmount] = useState(10);
  const [dailyBudget, setDailyBudget] = useState(100000);
  const [geolocations, setGeolocations] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  const [cities, setCities] = useState("");
  const [industries, setIndustries] = useState("");
  const [interests, setInterests] = useState("");
  const [startTime, setStartTime] = useState("");

  const [interestsSearchData, setInterestsSearchData] = useState<Interest[]>(
    []
  );
  const [citySearchData, setCitySearchData] = useState<LocationData[]>([]);
  const [industrySearchData, setIndustrySearchData] = useState<
    AdTargetingCategory[]
  >([]);

  const [returnInterestsData, setReturnInterestsData] = useState<string[]>([]);
  const [returnCityData, setReturnCityData] = useState<string[]>([]);
  const [returnIndustryData, setReturnIndustryData] = useState<string[]>([]);

  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleNextClick = async (e: FormEvent) => {
    e.preventDefault();
    //city
    var tempCity = citySearchData.filter((x) => returnCityData.includes(x.key));
    var geoCity: Cities[] = [];
    tempCity.forEach((x) => {
      var city: Cities = {
        key: x.key,
      };
      geoCity.push(city);
    });
    const geo: GeoLocation = {
      cities: geoCity,
    };
    //interest
    var tempInterest = interestsSearchData.filter((x) =>
      returnInterestsData.map((x) => parseInt(x)).includes(x.id)
    );
    //industry
    var tempIndustry = industrySearchData.filter((x) =>
      returnIndustryData.includes(x.id)
    );
    var industry: Interest[] = [];
    tempIndustry.forEach((x) => {
      var temp: Interest = {
        id: parseInt(x.id),
        name: x.name,
      };
      industry.push(temp);
    });

    const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
    const adaccountId = localStorage?.getItem("adAccountId") ?? "";
    //"message": "(#100) billing_event must be one of the following values: APP_INSTALLS, CLICKS, IMPRESSIONS, LINK_CLICKS, NONE, OFFER_CLAIMS, PAGE_LIKES, POST_ENGAGEMENT, THRUPLAY, PURCHASE, LISTING_INTERACTION",
    //Billing event invalid for optimisation goal",
    //"error_user_msg": "The specified billing event is not a valid option for the optimisation goal provided. If you are modifying the optimisation goal, please make sure that your billing event will still be consistent with your new optimisation goal.",
    const tempAdSetData: AdsetPayload = {
      adAccountId: adaccountId.toString(),
      campaignId: campaign,
      adsetName,
      optimizationGoal,
      billingEvent,
      bidAmount,
      dailyBudget,
      geolocations: geo,
      industries: industry,
      interests: tempInterest,
      startTime,
      status,
      accessToken: accessTokenfb,
      type: "Facebook",
    };
    console.log(tempAdSetData);

    try {
      setLoader(true)
      const response = await CreateAdsetService(tempAdSetData);
      if (response.statusCode == "200") {
        localStorage.setItem("campaignId", response.responseData.campaignId);
        setLoader(false)
        setSuccess(true);
        setMessage("Successfully created adset!");
      }
      setAdsetName("");
      setOptimizationGoal("");
      setBillingEvent("");
      setBidAmount(0),
        setDailyBudget(0),
        setGeolocations([]),
        setIndustries("");
      setInterests(""), setStartTime(""), setStatus("");
      setReturnIndustryData([]);
      setReturnInterestsData([]);
      setReturnCityData([]);
    } catch (error) {
      setLoader(false)
      setSuccess(false);
      setMessage("Failed to create adset.");
    }
  };

  const getAvailableInterestsData = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true)
      const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
      const response = await GetInterestsSearchData(interests, accessTokenfb);
      if (response.statusCode == "200") {
        setInterestsSearchData(response.responseData);
        setLoader(false)
        setSuccess(true);
        setMessage("Successfully fetched interests!");      
      }
    } catch (error) {
      setLoader(false)
      setSuccess(false);
      setMessage("Failed to fetch interests");     }
  };

  const getAvailableCityData = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true)

      const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
      const response = await GetCitySearchData(cities, accessTokenfb);
      if (response.statusCode === "200") {
        setCitySearchData(response.responseData);
        setLoader(false)
        setSuccess(true);
        setMessage("Successfully fetched cities!"); 
      }
    } catch (error) {
      setLoader(false)
      setSuccess(false);
      setMessage("Failed to fetch cities");    
    }
  };

  const getAvailableIndustryData = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true)
      const accessTokenfb = localStorage?.getItem("accesstoken_fb") ?? "";
      const response = await GetIndustrySearchData(accessTokenfb);
      if (response.statusCode == "200") {
        setIndustrySearchData(response.responseData);
        setLoader(false)
        setSuccess(true);
        setMessage("Successfully fetched industries!");
      }
    } catch (error) {
      setLoader(false)
      setSuccess(false);
      setMessage("Failed to fetch industries");
    }
  };

  const handleIndustrySearchData = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    if (Array.isArray(value)) {
      // console.log(value)
      setReturnIndustryData(value);
    }
  };

  const handleCitySearchData = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    if (Array.isArray(value)) {
      // console.log(value)
      setReturnCityData(value);
    }
  };

  const handleInterestsSearchData = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    if (Array.isArray(value)) {
      // console.log(value)
      setReturnInterestsData(value);
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
        {/* <Typography component="h1" sx={{ fontWeight: 700, color: "#272144", textAlign: "left", mb: 2 }}
        >Create a new Adset</Typography> */}
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
          Create a new Adset
        </Typography>
        <Grid container spacing={2} columns={12}>
          <Grid item sm={12} md={4} lg={4} xs={12}>
            <Box
              component="form"
              onSubmit={getAvailableInterestsData}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography sx={{ fontWeight: 600, alignContent: "center" }}>
                Search available interests
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  placeholder="Search Interests"
                  autoFocus
                  autoComplete="interests"
                  value={interests}
                  sx={{ width: "170px" }}
                  onChange={(e) => setInterests(e.target.value)}
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon
                    style={{ fill: "blue", alignContent: "center" }}
                  />
                </IconButton>
              </Box>
            </Box>

            <Box
              component="form"
              onSubmit={getAvailableCityData}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontWeight: 600, alignContent: "center", mr: "24px" }}
              >
                Search available cities
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  placeholder="Search Cities"
                  variant="outlined"
                  autoFocus
                  autoComplete="cities"
                  value={cities}
                  onChange={(e) => setCities(e.target.value)}
                  sx={{ width: "170px" }}
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon
                    style={{ fill: "blue", alignContent: "center" }}
                  />
                </IconButton>
              </Box>
            </Box>

            <Box
              component="form"
              onSubmit={getAvailableIndustryData}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontWeight: 600, alignContent: "center", mr: "-10px" }}
              >
                Search available industries
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  size="small"
                  margin="dense"
                  required
                  type="text"
                  variant="outlined"
                  autoFocus
                  placeholder="Search Industries"
                  autoComplete="industries"
                  value={industries}
                  onChange={(e) => setIndustries(e.target.value)}
                  sx={{ width: "170px" }}
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon
                    style={{ fill: "blue", alignContent: "center" }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          <Grid item sm={12} md={8} lg={8} xs={12}>
            <Box component="form" onSubmit={handleNextClick}>
              <Grid container spacing={2} columns={8}>
                <Grid item sm={12} md={4} lg={4} xs={12}>
                  {/* //xs={4}  */}
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
                      Adset Name
                    </Typography>
                    <TextField
                      size="small"
                      margin="dense"
                      required
                      type="text"
                      variant="outlined"
                      autoFocus
                      autoComplete="adsetName"
                      value={adsetName}
                      onChange={(e) => setAdsetName(e.target.value)}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: "5px",
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
                      Optimization Goal
                    </Typography>
                    <Dropdown
                      value={optimizationGoal}
                      onChange={(e) => setOptimizationGoal(e.target.value)}
                      options={optimization
                        .find((obj) => obj.codeWord === objective)
                        ?.["optimizationGoal"].map((goal, index) => ({
                          label: `${goal.codeWord} - \n${goal.description}`,
                          value: goal.codeWord,
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
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
                      Billing Event
                    </Typography>
                    <Dropdown
                      value={billingEvent}
                      onChange={(e) => setBillingEvent(e.target.value)}
                      options={billingEvents.map((obj, id) => ({
                        label: `${obj.codeWord} - ${obj.description}`,
                        value: obj.codeWord,
                      }))}
                      className="w-full"
                      style={{
                        height: "32px",
                        width: "210px",
                        fontFamily:
                          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: "small",
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
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
                      Bid Amount
                    </Typography>
                    <TextField
                      size="small"
                      margin="dense"
                      required
                      type="number"
                      variant="outlined"
                      autoFocus
                      InputProps={{ inputProps: { min: 10 } }}
                      autoComplete="bidAmount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                    />
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
                      Daily Budget
                    </Typography>
                    <TextField
                      size="small"
                      margin="dense"
                      required
                      type="number"
                      variant="outlined"
                      autoFocus
                      InputProps={{ inputProps: { min: 100000 } }}
                      autoComplete="dailyBudget"
                      value={dailyBudget}
                      onChange={(e) =>
                        setDailyBudget(parseFloat(e.target.value))
                      }
                    />
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
                      Cities
                    </Typography>
                    <MultiSelect
                      value={returnCityData}
                      onChange={(e) => handleCitySearchData(e.target.value)}
                      options={citySearchData.map((obj, id) => ({
                        label: `${obj.cityName}, ${obj.countryName}`,
                        value: obj.key,
                      }))}
                      className="w-full"
                      // scrollHeight="{citySearchData.length}+200px"
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

                <Grid item sm={12} md={4} lg={4} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: "5px",
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
                      Industries
                    </Typography>
                    <MultiSelect
                      value={returnIndustryData}
                      onChange={(e) => handleIndustrySearchData(e.target.value)}
                      options={industrySearchData.map((obj, id) => ({
                        label: `${obj.name}`,
                        value: obj.id,
                      }))}
                      className="w-full"
                      // scrollHeight="{citySearchData.length}"
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
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
                      Interests
                    </Typography>
                    <MultiSelect
                      value={returnInterestsData}
                      onChange={(e) =>
                        handleInterestsSearchData(e.target.value)
                      }
                      options={interestsSearchData.map((obj, id) => ({
                        label: `${obj.name}`,
                        value: obj.id,
                      }))}
                      className="w-full"
                      // scrollHeight="{interestsSearchData.length}+200"
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

                      // panelHeaderTemplate={
                      //   <div style={{ paddingLeft: "17px" }}></div>
                      // }
                    />
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
                      Start Time
                    </Typography>
                    <TextField
                      size="small"
                      margin="dense"
                      required
                      type="datetime-local"
                      variant="outlined"
                      autoFocus
                      autoComplete="startTime"
                      value={startTime}
                      sx={{ width: "210px" }}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, alignContent: "center" }}
                    >
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

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 8,
                      width: "100%",
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
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      </>
      }
      {success ? <SuccessSnackbar openBar={success} message={message} /> : ""}
      {failure ? <FailureSnackbar openBar={failure} message={message} /> : ""}
    </>
  );
};

export default AdsetForm;
