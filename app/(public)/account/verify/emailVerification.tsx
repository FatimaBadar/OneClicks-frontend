'use client'
import React, { useState} from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Avatar, Button,
    Paper, Box, Typography, createTheme, ThemeProvider, Divider,
    CircularProgress,
    Container
} from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useRouter, useSearchParams } from 'next/navigation';

import { VerifyService } from '@/app/_services/authService';

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import SuccessSnackbar from '@/app/_components/SuccessSnackbarComponent';
import FailureSnackbar from '@/app/_components/FailureSnackbarComponent';

export default function EmailVerification() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [loader, setLoader] = useState<boolean>(false);

    const [success, setSuccess] = useState<boolean>(false);
    const [failure, setFailure] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
        
    const submitVerification = async (e: any) => {
    e.preventDefault();
    const token = searchParams.get("token");
    try {
        setLoader(true)
        if(token!==""){
            const response = await VerifyService(token);
            
            if(response.statusCode=="200"){
                setLoader(false)
                setSuccess(true);
                setMessage("Account Verified Successfully!");
                                
                router.push('/account/login');
            }
        }
    } catch (error) {
        setLoader(false)
        setFailure(true);
        setMessage("Verification failed.");
    }
    }

    const defaultTheme = createTheme({
        typography: {
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
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
            <Box component={Paper} elevation={24} square={false}
                sx={{
                    mx: 'auto',
                    maxWidth: '600px',
                    // mr: 10, ml: 10, mt: 10,
                    borderRadius: '20px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}>

                {/* <CssBaseline /> */}

                <Box 
                    sx={{
                        my: 8, mx: 6,
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center'
                    }}>
                    <Avatar sx={{ mt: 8, mb: 2, bgcolor: '#597FB5' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5"
                        sx={{ fontWeight: 700 }}>
                        Email Verification
                    </Typography>

                    <MarkEmailReadIcon sx={{color: '#597FB5' , mt: 3, mb: 2, fontSize:45 }}></MarkEmailReadIcon>
{/* <Divider/> */}
                    {/* <Divider sx={{ my: 2, borderColor: "#fff !important" }} /> */}
                    <Divider sx={{ my: 2, borderColor: "#fff !important", height: "1px" }} />

                    <Typography textAlign="center" >
                        To verify your email address click on the button below.
                    </Typography>

                    {/* <Divider sx={{ my: 2, borderColor: "#fff !important" }} /> */}

                    <Typography sx={{mt: 2}}
                        textAlign="center" >
                        If you did not make this request, then you can ignore this email.
                    </Typography>
                 
                    <Button
                        onClick={submitVerification}
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3, mb: 8,
                            // width: '300px',
                            display:"flex",
                            width:"100%",
                            backgroundColor: "#597FB5 !important",
                            color: "#fff !important",
                            '&:hover': {
                                backgroundColor: "#405D80 !important",
                            },
                        }}> Verify Your Account 
                    </Button>
                    
                </Box>
                     </Box>
        </ThemeProvider>
        </>
      }
      {success ? <SuccessSnackbar openBar={success} message={message} /> : ""}
      {failure ? <FailureSnackbar openBar={failure} message={message} /> : ""}
      </>
    );
}
