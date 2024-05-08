'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import CustomButton from './LandingPageComponent/CustomButton';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';

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
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { usePathname } from 'next/navigation';
import useStore from '@/app/_store/authStore';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
  const store = useStore();
  const pathname = usePathname();
  const router = useRouter();

  const logoutFunc = async () => {
    store.setLoggedOut();

    if(localStorage.getItem('role')){
      localStorage?.removeItem('role');
    }
    localStorage.removeItem('token');
    store.removeAuthUser();

    if (pathname === '/home') {
      router.push('/');
    }
    // await userService.logout();
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
    fontSize: '14px',
    color: '#4F5361',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      color: '#405D80',
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));

  // const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
  //   cursor: 'pointer',
  //   display: 'none',
  //   marginRight: theme.spacing(2),
  //   [theme.breakpoints.down('md')]: {
  //     display: 'block',
  //   },
  // }));
  // const NavbarContainer = styled(Container)(({ theme }) => ({
  //   background: '#E6F0FF',
  //   boxShadow: 'none', // Remove box shadow
  //   // zIndex: theme.zIndex.drawer + 1,
  //   paddingLeft: theme.spacing(1),
  //   paddingRight: theme.spacing(1),
  //   [theme.breakpoints.down('md')]: {
  //     paddingLeft: theme.spacing(1),
  //     paddingRight: theme.spacing(1),
  //   },
  // }));
  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    background: '#E6F0FF',
    // opacity: 1, // Set opacity to 1 for full opacity
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.16)',
    borderWidth: '0px 0px thin',
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
  }));
  const theme = useTheme();

  const NavbarLogo = styled('img')(({ theme }) => ({
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));

  return (
    <AppBar sx={{ boxShadow: 'none' }}>
      <NavbarContainer
        maxWidth="xl"
        disableGutters
        sx={{
          gap: '2.5rem',
          pl: '20px',
          pr: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            // pl: "20px",
          }}
        >
          <Box //image for full screen
            sx={{
              mr: 'auto',
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              height: 25,
            }}
          >
            <Link href={'/'} style={{ textDecoration: 'none' }}>
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
              display: { xs: 'flex', md: 'none' },
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
              sx={{ color: '#0F1B4C' }}
            >
              <MenuIcon />
            </IconButton>

            <Paper sx={{ backgroundColor: '#E6F0FF' }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  mt: '45px',
                  alignItems: 'left',
                  // backgroundColor:"#E6F0FF"
                  // ml:"-30px"
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={'/home'} style={{ textDecoration: 'none' }}>
                    <Typography
                      className={pathname === '/' ? 'active' : ''}
                      textAlign="center"
                      color="#597FB5"
                      margin="-4px"
                      width="140px"
                      sx={{ '&:hover': { color: '#405D80' } }}
                    >
                      Home 
                    </Typography>
                  </Link>
                </MenuItem>
                <Divider />
                {!store.loggedIn ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={'/account/login'} style={{ textDecoration: 'none' }}>
                    <Typography
                      className={pathname === '/account/login' ? 'active' : ''}
                      textAlign="center"
                      color="#597FB5"
                      margin="-4px"
                      width="140px"
                      sx={{ '&:hover': { color: '#405D80' } }}
                    >
                      Login
                    </Typography>
                  </Link>
                </MenuItem>
                ): (
                  ""
                  )}
              </Menu>
            </Paper>
          </Box>

          <NavbarLinksBox>
            <Link href="/home" style={{ textDecoration: 'none' }}>
              <NavLink variant="body2">Home</NavLink>
            </Link>
            {/* <NavLink variant="body2">Features</NavLink> */}
            {/* <NavLink variant="body2">Services</NavLink> */}
            {/* <NavLink variant="body2">Dashboard</NavLink> */}
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <NavLink variant="body2">Contact Us</NavLink>
            </Link>
            <Link href="/campaigns" style={{ textDecoration: 'none' }}>
              <NavLink variant="body2">Ad Campaigns</NavLink>
            </Link>
            <Link href="/adsets" style={{ textDecoration: 'none' }}>
              <NavLink variant="body2">Adsets</NavLink>
            </Link>
            <Link href="/adcreatives" style={{ textDecoration: 'none' }}>
              <NavLink variant="body2">Ad Creatives</NavLink>
            </Link>
            <Link href="/ads" style={{ textDecoration: 'none' }}>
              <NavLink variant="body2">Ads</NavLink>
            </Link>
          </NavbarLinksBox>
        </Box>

        <Box //logo for small screen
          sx={{
            // ml: '160px',
            // ml: '100px',
            // alignItems: 'center',
            justifyContent: 'center',
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            height: 25,
          }}
        >
          <Link href={'/'} style={{ textDecoration: 'none' }}>
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
            display: 'flex',
          }}
        >
        {!store.loggedIn ? (
          <Box //login, signup for big screen
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'right',
              mr: '1rem',
              gap: '1rem',
            }}
          >
            <Link href="/account/login" style={{ textDecoration: 'none' }}>
              <NavLink variant="body2">Login</NavLink>
            </Link>

            <Link href="/account/register" style={{ textDecoration: 'none' }}>
              <CustomButton backgroundColor="#0F1B4C" color="#fff" buttonText="Register" />
            </Link>
          </Box>
          ):("")}

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon
                sx={{
                  fontSize: 40,
                  color: '#0F1B4C',
                  '&:hover': {
                    color: '#405D80',
                  },
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: '45px',

              [theme.breakpoints.down('md')]: {
                ml: theme.spacing(60), // Set margin-left to 16px on medium screens
              },
              [theme.breakpoints.up('lg')]: {
                ml: theme.spacing(145), // Set margin-left to 32px on large screens and above
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Link href={'/profile'} style={{ textDecoration: 'none' }}>
                <Typography
                  margin="-4px"
                  width="140px"
                  textAlign="center"
                  color="#597FB5"
                  sx={{ '&:hover': { color: '#405D80' } }}
                >
                  Profile
                </Typography>
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseUserMenu}>
              <Link href={'/account'} style={{ textDecoration: 'none' }}>
                <Typography
                  margin="-4px"
                  width="140px"
                  textAlign="center"
                  color="#597FB5"
                  sx={{ '&:hover': { color: '#405D80' } }}
                >
                  Account
                </Typography>
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseUserMenu}>
              <Link href={'/dashboard'} style={{ textDecoration: 'none' }}>
                <Typography
                  margin="-4px"
                  width="140px"
                  textAlign="center"
                  color="#597FB5"
                  sx={{ '&:hover': { color: '#405D80' } }}
                >
                  Dashboard
                </Typography>
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseUserMenu}>
              {/* <Button> */}
              <Link onClick={logoutFunc} style={{ textDecoration: 'none' }}>
                <Typography
                  margin="-4px"
                  width="140px"
                  textAlign="center"
                  color="#597FB5"
                  sx={{ '&:hover': { color: '#405D80' } }}
                >
                  Logout
                </Typography>
              </Link>
              {/* </Button> */}
            </MenuItem>
          </Menu>
        </Box>
      </NavbarContainer>
    </AppBar>
  );
};

export default Navbar;
