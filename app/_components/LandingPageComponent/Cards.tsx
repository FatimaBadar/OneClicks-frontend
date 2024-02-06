'use client'
import React from "react";
import { Box, Container, styled, Typography } from "@mui/material";

const CardContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "20px",
});

const Card = styled(Box)({
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  maxWidth: 200,
});

const CardImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const cardsData = [
  { id: 1, imgSrc: "/media/image1.png", altText: "Image 1", heading: "Facebook" },
  { id: 2, imgSrc: "/media/image2.png", altText: "Image 2", heading: "Instagram" },
  { id: 3, imgSrc: "/media/image3.png", altText: "Image 3", heading: "Google" },
];

const Cards: React.FC = () => {
  return (
    <Container>
      <Typography
       variant="h3" component="h1"
       color="text.primary" 
       sx={{ textAlign: "center", marginBottom: 2 }}
      >
        Featured Platforms
        </Typography>
        <Typography component="p" variant="h5" color="text.secondary" sx={{ textAlign: "center", marginBottom: 2 }}>  
        Platforms where you can unleash your ad campaigns<br />
      </Typography>

      <CardContainer>
        {cardsData.map((card) => (
          <Card key={card.id}>
            <CardImg src={card.imgSrc} alt={card.altText} />
            <Typography variant="h6" sx={{ textAlign: "center", marginTop: 1 }}>
              {`Card${card.id} ${card.heading}`}
            </Typography>
          </Card>
        ))}
      </CardContainer>

    </Container>
  );
};

export default Cards;
