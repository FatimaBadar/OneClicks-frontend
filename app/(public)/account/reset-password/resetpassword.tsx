'use client'
import React, { useState,useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar, Button, CssBaseline, TextField, Link,
  Paper, Box, Grid, Typography, createTheme, ThemeProvider, Divider
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useUserService } from '@/app/_services/useUserService';
import { ResetPasswordService } from '@/app/_services/authService';
import { Toast} from 'primereact/toast';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { PrimeReactProvider } from 'primereact/api';

export default function ResetPassword() {
  const router = useRouter();
  // const  token  = router.query
  // useEffect(() => {
  //   // Log the token to the console when the component mounts
  //   console.log('Token from URL:', token);
  // }, [token]);

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [PasswordError, setPasswordError] = useState<string>("");
  const toast = useRef<Toast>(null);
  const searchParams = useSearchParams();
  // const userService = useUserService();

  const submitReset = async (e: FormEvent) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setPasswordError("Password and confirm password should be same");
      return;
    }
    setPasswordError("");
    const token = searchParams.get("token");
    try {
      const response = await ResetPasswordService(token,password,confirmPassword);

      if(response.statusCode=="200"){
        showSuccessToast("Password successful changed!");

       // setTimeout(() => {
          router.push('/account/login');
       // }, 3000);   
      }   
      else if(response.statusCode=="401"){
        showErrorToast("Token is Expired!");
      }   

      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      showErrorToast("Please enter correct passwords.");
      // console.error(error);
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
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        
            // if(password ===value){
                setConfirmPassword(value);
                // setPasswordsMatch(false);
        // }
      
        break;
      default:
        break;
    }

    // if (password !== confirmPassword) {
    //     setPasswordsMatch(false);
    // }
    // else{
    // setPasswordsMatch(true);}
  }

  // const validateFormInput = (event) => {
  //   event.preventDefault();

  
  // };

  const defaultTheme = createTheme({
    typography: {
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            width: '100%',
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
    <Box component={Paper} elevation={24} square={false}
        sx={{
            mx: 'auto',
            maxWidth: '600px',
            // mr: 10, ml: 10, mt: 10,
            borderRadius: '20px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}>
        <Box sx={{ my: 8, mx: 4, py:8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <Avatar sx={{ m: 1, bgcolor: '#597FB5' }}>
    <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                Reset Password
           </Typography>
              <Box component="form" onSubmit={submitReset}
                sx={{
                  width: "93%",
                  mt: 3,
                  textAlign: 'center'
                }}>
                <TextField
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputProps={{
                    minLength: 8,
                  }}
                  value={password} onChange={onChange}
                  sx={{display:"flex"}}
                />  
                {/* <p className="error-message"></p> */}
                  <TextField  margin="normal"
                  required
                  name="confirmPassword"
                  label="Comfirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  value={confirmPassword} onChange={onChange}
                  sx={{display:"flex"}}
                  // error={!passwordsMatch}
                  // helperText={!passwordsMatch ? "Passwords do not match" : ""}
                />
                <Typography className="error-message" 
                sx={{color:"red",
                fontSize: 15,
                mb: -1
              }}
                 >{PasswordError}</Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3, mb: 2,
                    width: "100%",
                    display:"flex",
                    backgroundColor: "#597FB5 !important",
                    color: "#fff !important",
                    '&:hover': {
                      backgroundColor: "#405D80 !important",
                    },
                  }}> Reset Password
                </Button>
               
          </Box>
            </Box>
             </Box>
</ThemeProvider>
<PrimeReactProvider>
    <div className="card flex justify-content-center">  
    <Toast ref={toast} />
      </div>    
    </PrimeReactProvider>  
    </>
  );
}
