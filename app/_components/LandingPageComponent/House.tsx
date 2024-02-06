// 'use client'
import { Box, styled, Typography } from "@mui/material";
import React from "react";
import bedroomsIcon from "../media/bedroomsIcon.png";
import bathroomsIcon from "../media/bathroomsIcon.png";
import spaceIcon from "../media/spaceIcon.png";

interface HouseProps {
  img: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  space: number;
}

const House: React.FC<HouseProps> = ({ img, price, address, bedrooms, bathrooms, space }) => {
  const HouseBox = styled(Box)(({ theme }) => ({
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    maxWidth: 350,
    backgroundColor: "#fff",
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  const InfoBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    position: "relative",
    overflow: "hidden",
    paddingTop: "75%", // Maintain a 4:3 aspect ratio (adjust as needed)
  }));

  const Img = styled("img")(() => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  }));

  return (
    <HouseBox>
      <ImgContainer>
        <Img src={img} alt="housePhoto" />
      </ImgContainer>

      <Box sx={{ padding: "1rem" }}>
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          {address}
        </Typography>
        <Typography variant="body2" sx={{ my: 2 }}>
          {price}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <InfoBox>
            {/* <img src={bedroomsIcon} alt="bedroomsIcon" /> */}
            <Typography variant="body2" sx={{ mt: 1 }}>
              {bedrooms}
            </Typography>
          </InfoBox>

          <InfoBox>
            {/* <img src={bathroomsIcon} alt="bathroomssIcon" /> */}
            <Typography variant="body2" sx={{ mt: 1 }}>
              {bathrooms}
            </Typography>
          </InfoBox>

          <InfoBox>
            {/* <img src={spaceIcon} alt="spaceIcon" /> */}
            <Typography variant="body2" sx={{ mt: 1 }}>
              {space}
            </Typography>
          </InfoBox>
        </Box>
      </Box>
    </HouseBox>
  );
};

export default House;
