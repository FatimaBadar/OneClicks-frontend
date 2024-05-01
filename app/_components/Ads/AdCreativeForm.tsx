"use client";
import React, { FormEvent, useState } from "react";
import {
  Button,
  TextField,
  Box,
  createTheme,
  ThemeProvider,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import { CreateAdcampaignService } from "@/app/_services/adAccountService";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  // position: "absolute",
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
        e.preventDefault();
        try {
          const response = await CreateAdcampaignService();
          // if (response= "200") {
            console.log("res", response);
       
    //         // cookies.set('campaignId', response.responseData.campaignId, { path: '/' });
    //         onReturn(true);
          // }
    //       setCampaignName("");
    //       setObjective("");
    //       setStatus("");
    //       setSpecialAdCategory([]);
        } catch (error) {
          // onReturn(false);
          console.error(error);
        }
      }

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
        {/* <Box > */}
        <Typography
            component="h2"
            sx={{
              fontWeight: 700,
              color: "green",
              textAlign: "left",
              ml: 15,
              mr: 15,
              mb: 5
            }}
          >
            Create a new Adcreative
          </Typography>
        <Grid
          container
          spacing={2}
          columns={16}
          sx={{
            width: "80%",
            height: "100%",
            // mt: 3,
            display: "flex",
            ml: 15,
            mr: 15,
            mb: 5
          }}
        >
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              sx={{
                width: "100%",
                // mt: 5,
                textAlign: "center",
                p: 2,
                border: "2px solid grey",
                height: "100%",
              }}
            >
                {/* // src={image}
                // {...image}
                // alt="Snowy mountain peaks"
                // title="Photo from Unsplash"
                // blurDataURL={BASE64}
                // placeholder="blur" */}
              <Image
                src={image ? URL.createObjectURL(image) : ""}

                // src={image ? URL.createObjectURL(image) : ""}
                width={200} //397 //134
                height={200} //245 //25
                priority={true}
                alt="Upload File"
              />
              <Box>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    // value={image}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUploadClick(e)
                    }
                  />
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                textAlign: "-webkit-center",
                alignContent: "center",
              }}
            >
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 5,
                  // ml:15, mr: 15,
                  width: "80%",
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
          </Grid>
        </Grid>
        {/* </Box> */}
      </ThemeProvider>
    </>
  );
};

export default AdCreativeForm;
