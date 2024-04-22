"use client";
import React, { FormEvent, useState } from "react";
import {
  Button,
  TextField,
  Box,
  createTheme,
  ThemeProvider,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const AdCreativeForm = () => {
  const [creativeName, setcreativeName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    //     try {
    //       const response = await CreateCampaignService(tempCampaignData);
    //       if (response.statusCode == "200") {
    //         // cookies.set('campaignId', response.responseData.campaignId, { path: '/' });
    //         onReturn(true);
    //       }
    //       setCampaignName("");
    //       setObjective("");
    //       setStatus("");
    //       setSpecialAdCategory([]);
    //     } catch (error) {
    //       onReturn(false);
    //       console.error(error);
    //     }
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

  const handleUploadClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            mt: 10,
            textAlign: "center",
          }}
        >
          <Grid container spacing={2} columns={16}>
            <Grid xs={8}  
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                position: 'relative'
              }}>
              <Image
                src={image ? URL.createObjectURL(image) : ""}
                width={134}
                height={25}
                priority={true}
                alt="Upload File"
              />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                // onChange={handleUploadClick(e)}
              >
                Upload file
                <VisuallyHiddenInput type="file"
                // value={image}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUploadClick(e)}
                 />
              </Button>
            </Grid>

            <Grid xs={8}>
              <TextField
                margin="normal"
                required
                label="Creative Name"
                type="text"
                variant="outlined"
                autoFocus
                autoComplete="name"
                value={creativeName}
                onChange={(e) => setcreativeName(e.target.value)}
                sx={{ display: "flex" }}
                // focused
              />

              <TextField
                margin="normal"
                required
                label="Message"
                type="text"
                variant="outlined"
                autoFocus
                autoComplete="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ display: "flex" }}
                // focused
              />
            </Grid>
          </Grid>
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
  );
};

export default AdCreativeForm;
