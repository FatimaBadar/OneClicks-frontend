// import { Box, Container, styled, Typography, Theme } from "@mui/material";
// import React from "react";
// // import logoImg from "media/logo.png";
// // import starsImg from "../../public/media/Star.png";
// // import bedroomsIcon from "media/bedroomsIcon.png";
// // import bathroomsIcon from "media/bathroomsIcon.png";
// // import spaceIcon from "media/spaceIcon.png";
// // import logosImg from "../media/logos.png";

// const Companies: React.FC = () => {
//   const CustomContainer = styled(Container)<{ theme: Theme }>(({
//     theme
//   }) => ({
//     display: "flex",
//     justifyContent: "space-between",
//     [theme.breakpoints.down("md")]: {
//       flexDirection: "column",
//       alignItems: "center",
//       textAlign: "center",
//       marginBottom: theme.spacing(4),
//     },
//   }));

//   const CustomBox = styled(Box)<{ theme: Theme }>(({
//     theme
//   }) => ({
//     [theme.breakpoints.down("md")]: {
//       marginBottom: theme.spacing(4),
//     },
//   }));

//   return (
//     <Box sx={{ mt: 10 }}>
//       <CustomContainer >
//         <CustomBox>
//           <img src={logoImg} alt="logo" style={{ maxWidth: "100%" }} />
//           <Typography
//             variant="body2"
//             sx={{
//               color: "#7D8589",
//               fontSize: "16px",
//               fontWeight: "bold",
//               mt: 2,
//             }}
//           >
//             More than 45,000 trust OneClicks
//           </Typography>
//         </CustomBox>

//         <Box>
//           <img src='/Media/Star.png' alt="stars" style={{ maxWidth: "100%" }} />
//           <Typography
//             variant="body2"
//             sx={{
//               color: "#7D8589",
//               fontSize: "16px",
//               fontWeight: "bold",
//               mt: 2,
//             }}
//           >
//             5-Star Rating (2k+ Reviews)
//           </Typography>
//         </Box>
//       </CustomContainer>

//       {/* <Container sx={{ display: "flex", flexDirection: "column" }}>
//         <img src={logosImg} alt="logos" />
//       </Container> */}
//     </Box>
//   );
// };

// export default Companies;

'use client'
import {
  Box,
  Container,
  styled,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

// Assuming you have a theme defined or you can create a simple one
const theme = createTheme();

const Companies: React.FC = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginBottom: theme.spacing(4),
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(4),
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 10 }}>
        <CustomContainer>
          <CustomBox>
            {/* Assuming you have a logoImg imported */}
            <img src='/media/logo.png' alt="logo" style={{ maxWidth: "100%" }} />
            <Typography
              variant="body2"
              sx={{
                color: "#7D8589",
                fontSize: "16px",
                fontWeight: "bold",
                mt: 2,
              }}
            >
              More than 45,000 trust OneClicks
            </Typography>
          </CustomBox>

          <Box>
            {/* Use the / prefix to reference the asset from the public directory */}
            <img
              src="/media/Star.png"
              alt="stars"
              style={{ maxWidth: "100%" }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#7D8589",
                fontSize: "16px",
                fontWeight: "bold",
                mt: 2,
              }}
            >
              5-Star Rating (2k+ Reviews)
            </Typography>
          </Box>
        </CustomContainer>
      </Box>
    </ThemeProvider>
  );
};

export default Companies;
