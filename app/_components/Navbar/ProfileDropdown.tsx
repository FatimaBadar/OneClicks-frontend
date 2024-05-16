"use client";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  MenuProps,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { usePathname } from "next/navigation";
import useStore from "@/app/_store/authStore";
import { useRouter } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentComponent from "../Ads/PaymentComponent";

const GoogleDropdown: React.FC = () => {
  const store = useStore();
  const pathname = usePathname();
  const router = useRouter();

  const logoutFunc = async () => {
    store.setLoggedOut();

    if (localStorage.getItem("role")) {
      localStorage?.removeItem("role");
    }
    localStorage.removeItem("token");
    store.removeAuthUser();

    if (pathname === "/home") {
      router.push("/");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [callPaymentVar, setCallPaymentVar] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const callPayment = () => {
    setCallPaymentVar(true);
    setAnchorEl(null);

    setTimeout(() => {
      setCallPaymentVar(false);
    }, 1000);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <AccountCircleIcon
            sx={{
              fontSize: 40,
              color: "#0F1B4C",
              "&:hover": {
                color: "#405D80",
              },
            }}
          />
        </IconButton>
      </Tooltip>

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
            href="/home"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                color: "#405D80",
              },
              margin: "-4px",
              width: "140px",
              textAlign: "center",
              color: "#597FB5",
            }}
          >
            <Typography>Dashboard</Typography>
          </Link>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <Box
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                color: "#405D80",
              },
              margin: "-4px",
              width: "140px",
              textAlign: "center",
              color: "#597FB5",
            }}
            onClick={() => callPayment()}
          >
            {callPaymentVar ? (
              <PaymentComponent fromDropdown={callPaymentVar} />
            ) : (
              ""
            )}
            <Typography>Payment</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Link
            onClick={logoutFunc}
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                color: "#405D80",
              },
              margin: "-4px",
              width: "140px",
              textAlign: "center",
              color: "#597FB5",
            }}
          >
            <Typography>Logout</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default GoogleDropdown;
