import { Button, styled, Theme } from "@mui/material";
import React from "react";

interface CustomButtonProps {
  backgroundColor: string;
  color: string;
  buttonText: string;
  heroBtn?: boolean;
  guideBtn?: boolean;
  getStartedBtn?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  backgroundColor,
  color,
  buttonText,
  heroBtn,
  guideBtn,
  getStartedBtn,
}) => {
  // Use the `styled` function to create the styled component
  const StyledButton = styled(Button)(({ theme }: { theme: Theme }) => ({
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    padding: "0.5rem 1.25rem",
    borderRadius: "7px",
    textTransform: "none",
    display: "block",
    border: "2px solid transparent",
    "&:hover": {
      backgroundColor: "#405D80",
      color: "#fff",
      borderColor: "#405D80",

      // "405D80"
      // backgroundColor: color,
      // color: backgroundColor,
      // borderColor: backgroundColor,
    },
    [theme.breakpoints.down("md")]: {
      margin: (heroBtn || getStartedBtn) && theme.spacing(0, "auto", 3, "auto"),
      width: (heroBtn || getStartedBtn) && "90%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: guideBtn && theme.spacing(3),
      width: guideBtn && "90%",
    },
  }));

  return <StyledButton>{buttonText}</StyledButton>;
};

export default CustomButton;
