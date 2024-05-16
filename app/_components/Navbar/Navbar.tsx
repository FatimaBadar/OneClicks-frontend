"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import CustomButton from "../LandingPageComponent/CustomButton";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  Link,
  Paper,
  styled,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
  Divider,
  useTheme,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { usePathname } from "next/navigation";
import useStore from "@/app/_store/authStore";
import { useRouter } from "next/navigation";
import GoogleDropdown from "./GoogleDropdown";
import FacebookDropdown from "./FacebookDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { useState } from "react";
import PaymentComponent from "../Ads/PaymentComponent";

export const Navbar: React.FC = () => {
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
    // await userService.logout();
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#405D80",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    background: "#E6F0FF",
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.16)",
    borderWidth: "0px 0px thin",
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  }));
  const theme = useTheme();

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <AppBar sx={{ boxShadow: "none" }}>
      <NavbarContainer
        maxWidth="xl"
        disableGutters
        sx={{
          gap: "2.5rem",
          pl: "20px",
          pr: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            // pl: "20px",
          }}
        >
          <Box //image for full screen
            sx={{
              mr: "auto",
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              height: 25,
            }}
          >
            <Link href={"/"} style={{ textDecoration: "none" }}>
              <Image
                src="/Images/navbarlogo2.svg"
                width={134}
                height={25}
                priority={true}
                alt="OneClicks"
              />
            </Link>
          </Box>

          <Box //for menu
            sx={{
              display: { xs: "flex", md: "none" },
              // justifyContent: "left"
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              // color="primary"
              sx={{ color: "#0F1B4C" }}
            >
              <MenuIcon />
            </IconButton>

            <Paper sx={{ backgroundColor: "#E6F0FF" }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  mt: "45px",
                  alignItems: "left",
                  // backgroundColor:"#E6F0FF"
                  // ml:"-30px"
                }}
              >
                  {store.loggedIn ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={"/home"} style={{ textDecoration: "none" }}>
                    <Typography
                      className={pathname === "/" ? "active" : ""}
                      textAlign="center"
                      color="#597FB5"
                      margin="-4px"
                      width="140px"
                      sx={{ "&:hover": { color: "#405D80" } }}
                    >
                      Home
                    </Typography>
                  </Link>
                </MenuItem>
                ): ""}

                <Divider />
                {!store.loggedIn ? (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      href={"/account/login"}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        className={
                          pathname === "/account/login" ? "active" : ""
                        }
                        textAlign="center"
                        color="#597FB5"
                        margin="-4px"
                        width="140px"
                        sx={{ "&:hover": { color: "#405D80" } }}
                      >
                        Login
                      </Typography>
                    </Link>
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link
                        href={"/adcampaigns"}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          textAlign="center"
                          color="#597FB5"
                          margin="-4px"
                          width="140px"
                          sx={{ "&:hover": { color: "#405D80" } }}
                        >
                          Ad Campaigns
                        </Typography>
                      </Link>
                    </MenuItem>

                    <Divider />
                    <Accordion
                      sx={{
                        boxShadow: 0,
                        marginTop: "-8px",
                        marginBottom: "8px",
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <AccordionSummary
                          expandIcon={
                            <ArrowDropDownIcon
                              sx={{
                                color: "#597FB5",
                                "&:hover": { color: "#405D80" },
                              }}
                            />
                          }
                          aria-controls="panel2-content"
                          id="panel2-header"
                        >
                          <Typography
                            color="#597FB5"
                            sx={{ "&:hover": { color: "#405D80" } }}
                          >
                            Facebook Ads
                          </Typography>
                        </AccordionSummary>
                      </Box>
                      <AccordionDetails>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Link
                            href={"/adsets"}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              textAlign="center"
                              color="#597FB5"
                              margin="-4px"
                              width="140px"
                              sx={{ "&:hover": { color: "#405D80" } }}
                            >
                              Adsets
                            </Typography>
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Link
                            href={"/adcreatives"}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              textAlign="center"
                              color="#597FB5"
                              margin="-4px"
                              width="140px"
                              sx={{ "&:hover": { color: "#405D80" } }}
                            >
                              Ad Creatives
                            </Typography>
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Link
                            href={"/ads"}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              textAlign="center"
                              color="#597FB5"
                              margin="-4px"
                              width="140px"
                              sx={{ "&:hover": { color: "#405D80" } }}
                            >
                              Ads
                            </Typography>
                          </Link>
                        </MenuItem>
                      </AccordionDetails>
                    </Accordion>

                    <Divider />

                    <Accordion sx={{ boxShadow: 0, marginTop: "-8px" }}>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <AccordionSummary
                          expandIcon={
                            <ArrowDropDownIcon
                              sx={{
                                color: "#597FB5",
                                "&:hover": { color: "#405D80" },
                              }}
                            />
                          }
                          aria-controls="panel2-content"
                          id="panel2-header"
                        >
                          <Typography
                            color="#597FB5"
                            sx={{ "&:hover": { color: "#405D80" } }}
                          >
                            Google Ads
                          </Typography>
                        </AccordionSummary>
                      </Box>

                      <AccordionDetails>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Link
                            href={"/ads/google"}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              textAlign="center"
                              color="#597FB5"
                              margin="-4px"
                              width="140px"
                              sx={{ "&:hover": { color: "#405D80" } }}
                            >
                              Ads
                            </Typography>
                          </Link>
                        </MenuItem>
                      </AccordionDetails>
                    </Accordion>
                    <Divider />

                    <MenuItem
                      onClick={handleCloseNavMenu}
                      sx={{ marginTop: "8px" }}
                    >
                      <Link
                        onClick={logoutFunc}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          textAlign="center"
                          color="#597FB5"
                          margin="-4px"
                          width="140px"
                          sx={{ "&:hover": { color: "#405D80" } }}
                        >
                          Logout
                        </Typography>
                      </Link>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Paper>
          </Box>

          <NavbarLinksBox>
            <Link href="/home" style={{ textDecoration: "none" }}>
              <NavLink variant="body2">Home</NavLink>
            </Link>
            <Link href="/campaigns" style={{ textDecoration: "none", 
                // width: "140px",
                // textAlign: "center",
             }}>
              <NavLink variant="body2">Ad Campaigns</NavLink>
            </Link>
            <FacebookDropdown />
            <GoogleDropdown />
          </NavbarLinksBox>
        </Box>

        <Box //logo for small screen
          sx={{
            justifyContent: "center",
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            height: 25,
          }}
        >
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <Image
              src="/Images/navbarlogo2.svg"
              width={134}
              height={25}
              priority={true}
              alt="OneClicks"
            />
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          {!store.loggedIn ? (
            <Box //login, signup for big screen
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "right",
                mr: "1rem",
                gap: "1rem",
              }}
            >
              <Link href="/account/login" style={{ textDecoration: "none" }}>
                <NavLink variant="body2">Login</NavLink>
              </Link>

              <Link href="/account/register" style={{ textDecoration: "none" }}>
                <CustomButton
                  backgroundColor="#0F1B4C"
                  color="#fff"
                  buttonText="Register"
                />
              </Link>
            </Box>
          ) : (
            <Box sx={{ mr: "1rem" }}>
              <Link style={{ textDecoration: "none" }}>
                <PaymentComponent fromDropdown={false} />
              </Link>
            </Box>
          )}
          <ProfileDropdown />
        </Box>
      </NavbarContainer>
    </AppBar>
  );
};

export default Navbar;
