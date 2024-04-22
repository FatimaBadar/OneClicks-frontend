"use client";
import React, { FormEvent, useState, useRef } from "react";

import {
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import Cookies from 'universal-cookie';

import { AdImage } from "../../_models/adAccount.model";
import { CreateAdImageHashService } from "../../_services/adAccountService";

import { Toast } from "primereact/toast";

const AdImageForm =() => {
  const [filename, setFilename] = useState("");

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
    const tempAdImageData: AdImage = {
        filename,
        accessToken: cookies.get('accesstoken')
    };
    console.log(tempAdImageData);

    try {
      const response = await CreateAdImageHashService(tempAdImageData);
      if (response.statusCode == "200") {
        showSuccessToast(response.message);
      }
      setFilename("");
    } catch (error) {
      showErrorToast("Could not create Image hash");
      console.error(error);
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

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
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
            <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload file
  <VisuallyHiddenInput type="file" />
</Button>
    
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

export default AdImageForm;
