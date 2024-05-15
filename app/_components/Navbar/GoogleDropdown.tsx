"use client";

import {
  Button,
  Divider,
  Link,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import React, { useCallback } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter, useSearchParams } from "next/navigation";

const GoogleDropdown: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const CreateCampaign = useCallback(
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
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
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

      <Link
        variant="body2"
        onClick={handleClick}
        sx={{
          fontSize: "14px",
          color: "#4F5361",
          fontWeight: "bold",
          cursor: "pointer",
          textDecoration: "none",
          "&:hover": {
            color: "#405D80",
          },
        }}
      >
        Google Ads
      </Link>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            href="/ads/google"
            sx={{
              fontSize: "14px",
              color: "#4F5361",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                color: "#405D80",
              },
            }}
          >
            <Typography>Ads</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default GoogleDropdown;
