'use client';

// import { Box, styled, Typography, Container, Theme } from "@mui/material";
// import React from "react";
// // import Navbar from "./Navbar";
// import 

// import heroImg from "../media/hero_illustration.png";
// import CustomButton from "./CustomButton";

// const Hero: React.FC = () => {
//   const CustomBox = styled(Box)<{ theme: Theme }>(({
//     theme
//   }) => ({
//     display: "flex",
//     justifyContent: "center",
//     gap: theme.spacing(5),
//     marginTop: theme.spacing(3),
//     [theme.breakpoints.down("md")]: {
//       flexDirection: "column",
//       alignItems: "center",
//       textAlign: "center",
//     },
//   }));

//   const Title = styled(Typography)<{ theme: Theme }>(({
//     theme
//   }) => ({
//     fontSize: "64px",
//     color: "#000336",
//     fontWeight: "bold",
//     margin: theme.spacing(4, 0, 4, 0),
//     [theme.breakpoints.down("sm")]: {
//       fontSize: "40px",
//     },
//   }));

//   return (
//     <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
//       <Container>
//         <Navbar />
//         <CustomBox>
//           <Box sx={{ flex: "1" }}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: "18px",
//                 color: "#687690",
//                 fontWeight: "500",
//                 mt: 10,
//                 mb: 4,
//               }}
//             >
//               Welcome to OneClicks Marketing Tool
//             </Typography>
//             <Title variant="h1">
//               Market your Ad campaign with ease
//             </Title>
//             <Typography
//               variant="body2"
//               sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
//             >
//               Empower your brand with precision and impact using our innovative marketing tool!
//             </Typography>
//             <CustomButton
//               backgroundColor="#0F1B4C"
//               color="#fff"
//               buttonText="More About Us"
//               heroBtn={true}
//             />
//           </Box>

//           <Box sx={{ flex: "1.25" }}>
//             <img
//               src={heroImg}
//               alt="heroImg"
//               style={{ maxWidth: "100%", marginBottom: "2rem" }}
//             />
//           </Box>
//         </CustomBox>
//       </Container>
//     </Box>
//   );
// };

// export default Hero;
import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import HeaderComponent from "./header";
// import heroImg from "../media/hero_illustration.png";
import CustomButton from "./CustomButton";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    // gap: theme.spacing(5),
    // marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    alignItems: "center",
    gap: "2.5rem",
    pl: "20px",
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "90vh", mt:8 }}>
      <Container >
        {/* <Navbar/> */}
        {/* <HeaderComponent/> */}
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to OneClicks Marketing Tool
            </Typography>
            <Title variant="h1">
              Market you Ad campaign with ease
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Empower your brand with precision and impact using our innovative marketing tool!
            </Typography>
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              
              buttonText="More About Us"
              
              heroBtn={true}
            />
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src='/media/hero_illustration.png'
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
     </Box>
  );
};

export default Hero;
