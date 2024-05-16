// check line 164
"use client";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Divider,
  Container,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RegisterService } from "@/app/_services/authService";
import useStore from "@/app/_store/authStore";
import { UserPayload } from "@/app/_models/user.model";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import SuccessSnackbar from "@/app/_components/SuccessSnackbarComponent";
import FailureSnackbar from "@/app/_components/FailureSnackbarComponent";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  // const userService = useUserService();
  // useEffect(() => {
  //   // if (!store.authUser) {
  //   //   fetchUser();
  //   // }
  // }, []);

  // async function fetchUser() {
  //   return store.authUser;
  // }

  const submitSignup = async (e: FormEvent) => {
    e.preventDefault();
    const tempUser: UserPayload = {
      firstname,
      lastname,
      username,
      email,
      password,
    };

    try {
      setLoader(true);
      const response = await RegisterService(tempUser);
      if (response.statusCode == "200") {
        setLoader(false)
        setSuccess(true);
        setMessage("Registered. \nPlease verify your account using the verification Link sent to your email address.");
        
      } else {
        setLoader(false)
        setFailure(true);
        setMessage("Registration failed. Please check your credentials..");
      }

      setFirstname("");
      setLastname("");
      setUsername("");
      setEmail("");
      setPassword("");

      router.push("/");
    } catch (error) {
      setLoader(false)
      setFailure(true);
      setMessage("Registration failed. Please check your credentials..");     
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
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
          <CircularProgress size={"70px"} />
        </Container>
      ) : 
        <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ m: 7 }}>
          <Grid
            container
            component={Paper}
            elevation={24}
            square={false}
            sx={{
              borderRadius: "20px",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}
          >
            <CssBaseline />
            <Grid
              item
              sx={{
                m: "auto",
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                  lg: "block",
                  xl: "block",
                }, // hide on extra-small screens, show on medium screens
                // display: { xs: "none", md: "block" }, // hide on extra-small screens, show on medium screens
              }}
            >
              <Image
                src="/Images/signupImage.svg"
                width={456}
                height={304}
                priority={true}
                alt="signuppageimage"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "#597FB5" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: 700 }}
                >
                  Sign Up
                </Typography>
                <Box
                  component="form"
                  onSubmit={submitSignup}
                  sx={{
                    width: "93%",
                    mt: 3,
                    textAlign: "center",
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    type="text"
                    variant="outlined"
                    autoFocus
                    autoComplete="username"
                    value={firstname}
                    onChange={onChange}
                    sx={{ display: "flex" }}
                    // focused
                  />
                  <TextField
                    margin="normal"
                    required
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    type="text"
                    autoFocus
                    autoComplete="username"
                    value={lastname}
                    onChange={onChange}
                    sx={{ display: "flex" }}
                    // focused
                  />
                  <TextField
                    margin="normal"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    type="text"
                    autoFocus
                    autoComplete="username"
                    value={username}
                    onChange={onChange}
                    sx={{ display: "flex" }}
                    // focused
                  />
                  <TextField
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    autoFocus
                    value={email}
                    onChange={onChange}
                    sx={{ display: "flex" }}
                  />
                  <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    // minLength="8"
                    inputProps={{
                      minLength: 8,
                    }}
                    value={password}
                    onChange={onChange}
                    sx={{ display: "flex" }}
                  />

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
                    // onClick={showSuccessToast}
                  >
                    {" "}
                    Sign Up
                  </Button>
                  <Divider variant="middle" sx={{ mb: 2 }} />
      
                  <Link
                    href="/account/login"
                    variant="body2"
                    textAlign="center"
                    sx={{
                      fontWeight: 600,
                      color: "#597FB5",
                      "&:hover": {
                        fontWeight: 500,
                      },
                    }}
                  >
                    <p>Already have an account? Login</p>
                  </Link>
                </Box>
              </Box>
            </Grid>
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

export default Signup;
