"use client";

import {
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  alpha,
  styled,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { ConnectAdAccount } from "../../_services/adAccountService";
import { Toast } from "primereact/toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/navigation";

const AccountLogin: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const loadFacebookSDK = () => {
      const fbScript = document.createElement("script");
      fbScript.id = "facebook-jssdk";
      fbScript.src = "https://connect.facebook.net/en_US/sdk.js";
      document.getElementsByTagName("head")[0].appendChild(fbScript);

      fbScript.onload = () => {
        window.fbAsyncInit = () => {
          window.FB?.init({
            appId: "733989884793288",
            cookie: true,
            xfbml: true,
            version: "v18.0",
          });
        };
      };
    };
    loadFacebookSDK();
  }, []);
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

  const adAccount = async (accessToken: string) => {
    try {
      const backendResponse = await ConnectAdAccount(accessToken);
      if (backendResponse.statusCode == "200") {
        localStorage.setItem(
          "accesstoken_fb",
          backendResponse.responseData.longLiveToken
        );
        localStorage.setItem(
          "adAccountId",
          backendResponse.responseData.adAccountId
        );
        localStorage.setItem("pageId", backendResponse.responseData.pages[0]);
        showSuccessToast("Ad Account Connected successfully");
      } else {
        showErrorToast(backendResponse.message);
      }
    } catch (error) {
      showErrorToast("Could not connect ad account");
    }
  }
  const oauthSignIn = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    const params = {
      client_id: '195870252277-kgqnfto3d27fhvvhivk7m3ikfkc4qhvl.apps.googleusercontent.com',
      redirect_uri: 'https://localhost:3000/home',
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/adwords',
      include_granted_scopes: 'true',
      state: 'try_sample_request',
      access_type : 'offline'
    };

    const queryString = new URLSearchParams(params).toString();
    router.push(`${oauth2Endpoint}?${queryString}`);
  };

  const fblogin = () => {
    window.FB.login(
      (response: any) => {
        if (response.status === "connected") {
          console.log(response.authResponse.accessToken);
          adAccount(response.authResponse.accessToken);

          fetch(`/api/fblogin?token=${response.authResponse.accessToken}`).then(
            (response2) => console.log("Debug response: ", response2)
          );
        }
      },
      {
        scope:
          "email, read_insights, pages_show_list, ads_management, ads_read, business_management, pages_read_engagement,pages_manage_posts",
      }
    );
  };
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          backgroundColor: "#597FB5 !important",
          color: "#fff !important",
          "&:hover": {
            backgroundColor: "#405D80 !important",
          },
        }}
      >
        Connect Ad Account
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={fblogin} disableRipple>
          <Button
            variant="contained"
            sx={{
              // width: '38vh',
              backgroundColor: "#597FB5 !important",
              color: "#fff !important",
              "&:hover": {
                backgroundColor: "#405D80 !important",
              },
            }}
          >
            Facebook
          </Button>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={oauthSignIn} disableRipple>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#597FB5 !important",
              color: "#fff !important",
              "&:hover": {
                backgroundColor: "#405D80 !important",
              },
            }}
          >
            Google
          </Button>
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default AccountLogin;
