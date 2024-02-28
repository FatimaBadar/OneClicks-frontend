"use client";

import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  Typography,

} from "@mui/material";
import AdsetForm from "./AdSetForm";
import AdCampaignForm from "./AdCampaignForm";
import React, { useState } from "react";

const AdCampaignModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [showAdSetForm, setShowAdSetForm] = useState(false);
  const [objective, setObjective] = useState("");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReturnValue = async (e: string) => {
    setObjective(e);
    setShowAdSetForm(true);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      {/* <Button onClick={handleClickOpen("paper")}>scroll=paper</Button> */}
      <Button
        onClick={handleClickOpen("paper")}
        variant="contained"
        sx={{
          marginRight: "10px",
          backgroundColor: "#597FB5 !important",
          color: "#fff !important",
          "&:hover": {
            backgroundColor: "#405D80 !important",
          },
        }}
      >
        Create New Campaign
      </Button>

      <Dialog
      fullWidth 
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
        {!showAdSetForm ? (
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            Create a Campaign
          </Typography>            ) : (
            <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            Create an Ad
          </Typography>            )}
          
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {!showAdSetForm ? (
              <AdCampaignForm onReturnObjective={handleReturnValue} />
            ) : (
              <AdsetForm selectedObjective={objective} />
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Back</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default AdCampaignModal;
