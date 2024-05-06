import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ConfirmationModal: React.FC<{
  managerAccount: string;
  clientAccount: string;
  onSave: () => void;
  onCancel: () => void;
}> = ({ managerAccount, clientAccount, onSave, onCancel }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to save the following accounts?</p>
        <p>Manager Account: {managerAccount}</p>
        <p>Client Account: {clientAccount}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
