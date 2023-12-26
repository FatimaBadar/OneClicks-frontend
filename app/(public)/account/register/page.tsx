// check line 164
'use client'
import React, { useState,useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar, Button, CssBaseline, TextField, Link,
  Paper, Box, Grid, Typography, createTheme, ThemeProvider, Divider
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import { useUserService } from '@/app/_services/useUserService';
import { RegisterService } from '@/app/_services/authService';
import useStore from '@/app/_store/authStore';
import { UserPayload } from '@/app/_models/user.model';
// import  {showSuccessToast, showErrorToast, ToastComponent} from '@/app/_components/toaster';
import { Toast} from 'primereact/toast';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { PrimeReactProvider } from 'primereact/api';
// If 'useUserService' is a custom hook, make sure to import its type definition or create one
// Example: import { useUserService } from '@/Services/useUserService';
// interface UseUserService {
//   signup: (data: any) => Promise<any>;
// }

const  Signup=()=> {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useRef<Toast>(null);

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
    const tempUser: UserPayload = { firstname, lastname, username, email, password };

    try {
      const response = await RegisterService(tempUser);
      if(response.statusCode == "200"){
        showSuccessToast("Regsitered. \nPlease verify your account using the verification Link sent to your email address.");        
      }
      else{
        showErrorToast("Registration failed. Please check your credentials.");
      }

      setFirstname("");
      setLastname("");
      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push('/');
      }, 3000);   

    } catch (error) {
      console.error(error);
      showErrorToast("Please enter correct registered username.");
    }
  }
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
  }

  const defaultTheme = createTheme({
    typography: {
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            width: '360px',
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

  //   const showSuccessToast = () => {
  //   toast.current?.show({
  //     severity: 'success',
  //     summary: 'Success',
  //     detail: 'Verification Link sent to your email: {email}',
  //     life: 3000,
  //   });
  // };

  // const showErrorToast = ()=>{
  // // message: string) => {
  //   toast.current?.show({
  //     severity: 'error',
  //     summary: 'Error Message',
  //     detail: "not registered",
  //     life: 3000,
  //   });
  // };

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ m: 10 }}>
        <Grid container component={Paper} elevation={24} square={false} sx={{ borderRadius: '20px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
          <CssBaseline />
          <Grid
            item
            sx={{
              m: "auto",
              display: { xs: "none", md: "block" }, // hide on extra-small screens, show on medium screens
            }}
          >
             <Image
              src="/Images/signupImage.svg"
              width={456 }
              height={304 }
              alt="signuppageimage"
            />
          
            {/* <img src="/Images/signupImage.svg" alt="" /> */}
          </Grid>
          {/* <Grid item xs={false} md={6} sx={{ m: 'auto' }}>
            <img src="/Images/signupImage.svg" alt="" />
          </Grid> */}

          <Grid item xs={12} md={6}>
            <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: '#597FB5' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                Sign Up
              </Typography>
              <Box component="form" onSubmit={submitSignup}
                sx={{
                  mt: 3,
                  // ml:10,
                  // justifyContent: 'center', 
                  textAlign: 'center'
                }}>
                <TextField margin="normal" required
                  // fullWidth
                  id="firstname" label="First Name"
                  name="firstname" type='text'
                  variant='outlined'
                  autoFocus
                  autoComplete ="username"
                  value={firstname} onChange={onChange}
                // focused         
                />
                <TextField margin="normal" required
                  id="lastname" label="Last Name"
                  name="lastname" type='text'
                  autoFocus
                  autoComplete ="username"
                  value={lastname} onChange={onChange}
                // focused
                />
                <TextField margin="normal" required
                  id="username" label="Username"
                  name="username" type='text'
                  autoFocus
                  autoComplete ="username"
                  value={username} onChange={onChange}
                // focused
                />
                <TextField margin="normal" required
                  id="email" label="Email Address"
                  name="email" autoComplete="email"
                  type='email'
                  autoFocus
                  value={email} onChange={onChange}
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
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters
                  value={password} onChange={onChange}
                />
              
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3, mb: 2,
                    width: '360px',
                    backgroundColor: "#597FB5 !important",
                    color: "#fff !important",
                    '&:hover': {
                      backgroundColor: "#405D80 !important", // Darker color on hover
                    },
                  }}
                  // onClick={showSuccessToast} 
                  > Sign Up
                </Button>
                <Divider variant="middle"
                  sx={{ mb: 2 }} />
                {/* <Grid container pr={1}> */}
                {/* <Grid item xs> */}
               
                {/* <Link href="#resetPassword" variant="body2" textAlign="center"
                  sx={{
                    fontWeight: 600, color: '#597FB5',
                    '&:hover': {
                      fontWeight: 500,
                    }
                  }}>
                  <p>Forgot password?</p>
                </Link> */}

                {/* </Grid> */}
                {/* <Grid item   > */}
                <Link href="/account/login" variant="body2" textAlign="center"
                  sx={{
                    fontWeight: 600, color: '#597FB5',
                    '&:hover': {
                      fontWeight: 500,
                    }
                  }}>
                  <p>Already have an account? Login</p>
                </Link>
                {/* </Grid> */}
                {/* </Grid> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>

    {/* <ToastComponent/> */}
    <PrimeReactProvider>
    <div className="card flex justify-content-center">  
    <Toast ref={toast} />
      </div>    
    </PrimeReactProvider>
    </>
  );
}


export default  Signup