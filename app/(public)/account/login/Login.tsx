// components/LoginComponent.tsx

'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Image from 'next/image';

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
} from '@mui/material';

import { useRouter } from 'next/navigation';
// import { Toast } from 'primereact/toast';
// import Cookies from "universal-cookie";
import { LoginService, ForgetPasswordService } from '@/app/_services/authService';
import Cookies from 'universal-cookie';
import useStore from '@/app/_store/authStore';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Dialog } from 'primereact/dialog';

export default function LoginComponent() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [ForgotPassUsername, setForgotPassUsername] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const store = useStore();
  const router = useRouter();
  const cookies = new Cookies();
  const toast = useRef<Toast>(null);

  // useEffect(() => {
  //   if (!store.authUser) {
  //     fetchUser();
  //   }
  // }, []);

  // async function fetchUser() {
  //   return store.authUser;
  // }

  const submitForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await ForgetPasswordService(ForgotPassUsername);
      if (response.statusCode == "200") {
        showSuccessToast(response.message);
        // cookies.set('token', response.responseData.token);
        // showSuccessToast('Reset password Link sent to your email!');
        setTimeout(() => {
          router.push('/home');
        }, 3000);     
       } 
      else{
        showErrorToast(response.message);
      }
      setForgotPassUsername('');

    } catch (error) {
      showErrorToast('Please enter correct registered username.');
    }
  };

  const submitLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await LoginService(username, password);
      // if (response.token) {
      //   headers["Authorization"] = `Bearer ${token}`;
      // }
      console.log("res", response);
      if (response.statusCode == "200") {
        try {
          store.setAuthUser(response.responseData);
          console.log('user store2: ', store.authUser);
        } catch (error: any) {
          console.log('errorrr');
        }
        cookies.set('token', response.responseData.token);
        cookies.set('role', response.responseData.role);

        showSuccessToast('Logged in successfully!');

        setTimeout(() => {
          router.push('/home');
        }, 3000);
        // jwtVerification(response.token);
        // cookies.set('authorization', response.token, { httpOnly: true });
      }
     // <ToastComponent func="SuccessToast" message="Logged in successfully!"/>
      setUsername('');
      setPassword('');
    } 
    catch (error) {
      console.error(error);
      showErrorToast('Login failed. Please check your credentials.');
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'ForgotPassUsername':
        setForgotPassUsername(value);
        break;
      default:
        break;
    }
  };

  const showSuccessToast = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
    });
  };

  const showErrorToast = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error Message',
      detail: message,
      life: 3000,
    });
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
            // width: '360px',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
            borderRadius: '8px',
            '& .MuiInputLabel-root': {
              transform: 'translateY(50%)',
            },
          },
          input: {
            borderRadius: '50%',
            height: '15px',
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ m: 7}}>
          <Grid
            container
            component={Paper}
            elevation={24}
            square={false}
            sx={{
              borderRadius: '20px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
          >
            <CssBaseline />
            <Grid
              item
              sx={{
                m: 'auto',
                display: { xs: 'none', 
                sm: 'none', md: 'block', 
                lg: 'block', xl: 'block' }, // hide on extra-small screens, show on medium screens
              }}
            >
              <Image src="/Images/signupImage.svg" 
              width={456} height={304} priority={true} alt="loginpageimage" />
              {/* <Image
              src="/Images/signupImage.svg"
              width={200}
              height={200}
              // width={640}
              // height={412.66}
              // priority={true}
              alt="loginpageimage"
              // style={{ width: '100%', height: 'auto', aspectRatio: '640 / 442.66' }}
            /> */}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: '#597FB5' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                  Login
                </Typography>
                <Box
                  component="form"
                  onSubmit={submitLogin}
                  sx={{
                    width: "93%",
                    // width: '360px',
                    mt: 3,
                    textAlign: 'center',
                  }}
                >
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
                    sx={{display:"flex"}}
                  />
                  <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChange}
                    sx={{display:"flex"}}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      width: "100%",
                      display:"flex",
                      // width: '360px',
                      // width: "66%",
                      backgroundColor: '#597FB5 !important',
                      color: '#fff !important',
                      '&:hover': {
                        backgroundColor: '#405D80 !important',
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Divider variant="middle" sx={{ mb: 2 }} />
                  <Link
                    // href="#forgotpassword"
                    variant="body2"
                    textAlign="center"
                    sx={{
                      fontWeight: 600,
                      color: '#597FB5',
                      '&:hover': {
                        fontWeight: 500,
                      },
                    }}
                    onClick={() => setVisible(true)}
                  >
                    <p>Forgot password?</p>
                  </Link>
                  <Link
                    href="/account/register"
                    variant="body2"
                    textAlign="center"
                    sx={{
                      fontWeight: 600,
                      color: '#597FB5',
                      '&:hover': {
                        fontWeight: 500,
                      },
                    }}
                  >
                    <p>Don&apos;t have an account? Signup</p>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>

      <div className=" bg-teal-500 card flex justify-content-center">
        <Dialog
          header="Forgot Your Password?"
          className="shadow-8 m-3 surface-card "
          // align="center"
          // headerClassName="flex align-items-center"
          visible={visible}
          onHide={() => setVisible(false)}
          style={{ width: '50vw', color: 'bg-teal-500' }}
          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
          // component={Paper}
          //   elevation={24}
          //   square={false}
          //   sx={{
          //     borderRadius: "20px",
          //     boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          //   }}
        >
          <Typography>
            Please enter your username used to register. We will send you a link to reset your
            password to that address
          </Typography>
          {/* <Typography>
      </Typography> */}

          <Box
            sx={{
              ml: -3,
              mr: -3,
              mb: -4,
              mt: 2,
              bgcolor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="form"
              onSubmit={submitForgotPassword}
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                margin="normal"
                required
                id="ForgotPassUsername"
                label="Username"
                name="ForgotPassUsername"
                type="text"
                autoFocus
                autoComplete="ForgotPassUsername"
                value={ForgotPassUsername}
                onChange={onChange}
                sx={{
                  width: '250px',
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
                  borderRadius: '8px',
                  // mb:-2
                }}
              />
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{
                  mb: 2,
                  width: '200px',
                  backgroundColor: '#597FB5 !important',
                  color: '#fff !important',
                  '&:hover': {
                    backgroundColor: '#405D80 !important',
                  },
                }}
              >
                {' '}
                Retrieve Password
              </Button>
            </Box>
          </Box>
        </Dialog>
      </div>

      {/* <PrimeReactProvider> */}
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
      {/* </PrimeReactProvider>   */}
    </>
  );
}
