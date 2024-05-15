"use client";
import React, { FormEvent, useRef, useState } from "react";
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
import { CreateAdImageHashService, CreateAdcreativeService } from "@/app/_services/adAccountService";
import { AdCreativePayload, AdImagePayload, ImageHash } from "@/app/_models/adAccount.model";
import { Toast } from "primereact/toast";
import { ResponseVM } from "@/app/_models/response.model";
import ClearIcon from '@mui/icons-material/Clear';

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "https://localhost:7256";

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

interface AdCreativeProps {
  adset: string;
}

const AdCreativeForm: React.FC<AdCreativeProps> = ({ adset }) => {

  const [creativeName, setcreativeName] = useState("");
  const emptyFile = new File([], '', { type: '' });
  // const emptyFile2 = new File([])
  const [image, setImage] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState("");
  const [message, setMessage] = useState("");
  const [displaySelectButton, setDisplaySelectButton] = useState(true);

  const [imageHash, setImageHash] = useState("");
  const toast = useRef<Toast>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const accessTokenfb = localStorage?.getItem('accesstoken_fb') ??  "";
    const adAccountId = localStorage?.getItem('adAccountId') ??  "";
    const pgId = localStorage?.getItem('pageId') ??  "";

    const tempAdCreativeData: AdCreativePayload = {
      creativeName,
      pageId: pgId,
      imageHash: imageHash,
      fileName: image? image.name : "",
      adsetId: adset,
      message,
      AdAccountId: adAccountId,
      accessToken: accessTokenfb,      
      type: "Facebook"
    };
    try {
      const response = await CreateAdcreativeService(tempAdCreativeData);
      if (response.statusCode == "200") {
        setMessage(response.responseData.message);
        setcreativeName(response.responseData.creativeName);
        console.log("creative res", response.responseData);
        showSuccessToast(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const clearImage = async () => {
    setImage(emptyFile);
    setDisplaySelectButton(true);
  }

  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if(file){
      setImage(file)
      setImagePath(file.name)
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePath(file.name);
      };
      reader.readAsDataURL(file);
    }
    setDisplaySelectButton(false)
  }

  const handleUploadClick = async (e: FormEvent) => {
    e.preventDefault();

    const formData: FormData = new FormData();
    if(image){
      formData.append("imageFile", image);  
    }
    
    const accessTokenfb = localStorage?.getItem('accesstoken_fb') ??  "";
    const adaccountId = localStorage?.getItem('adAccountId') ??  "";
    try {
      const response = await CreateAdImageHashService(adaccountId.toString(), formData, accessTokenfb);
      if (response.statusCode === "200") {
        const hash = response.responseData;
        setImageHash(hash);
      }
    } catch (error) {
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

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
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
              onSubmit={handleUploadClick}
              sx={{
                width: "100%",
                textAlign: "center",
                p: 2,
                border: "2px solid grey",
                height: "100%",
              }}
            >
              <Image
                src={image? URL.createObjectURL(image) : ""}
                width={200} //397 //134
                height={200} //245 //25
                priority={true}
                alt=""
              />                
              <ClearIcon sx={{position: "top"}} onClick={clearImage}/>
              <Box>
              { displaySelectButton ? 
              <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Select file
                  <VisuallyHiddenInput
                    type="file"
                    // value={image}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSelectFile(e)
                    }
                  />
                </Button>
                : 
                <Button
                  type="submit"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                </Button>
                }
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
      </ThemeProvider>
    </>
  );
};

export default AdCreativeForm;
