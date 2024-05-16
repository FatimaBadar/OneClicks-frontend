"use client";

import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  alpha,
  styled,
} from "@mui/material";
import React, { useCallback} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter, useSearchParams } from "next/navigation";

const CreateAd: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const CreateAd = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  
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
          marginRight: "10px"
        }}
      >
        Create an ad
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
        <MenuItem  
        onClick={() => {router.push("/campaigns" +"?" + CreateAd("account","facebook" ) );}}
        disableRipple>
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
            Facebook
          </Button>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem disableRipple
        onClick={() => {router.push("/campaigns" +"?" + CreateAd("state","google" ) );}}>
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

export default CreateAd;
