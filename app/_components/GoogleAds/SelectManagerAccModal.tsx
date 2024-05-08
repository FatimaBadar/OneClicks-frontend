import React, { FormEvent, useEffect, useRef, useState } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation"; 
import { GetManagerAccounts } from "@/app/_services/googleService";
import SelectClientAccountModal from "./SelectClientAccModal";

const SelectManagerAccModal: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  const [selectedManager, setSelectedManager] = useState<string>("");

  const [managerAccounts, setManagerAccounts] = useState<string[]>([]);
  const [openClientAccModal, setOpenClientAccModal] = useState<boolean>(false);

  const toast = useRef<Toast>(null);
  const router = useRouter();

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
   fetchManagerAccounts();
  }, [])
  

  const handleSelectManager = () => {
    if(selectedManager){
      setOpenClientAccModal(true);
    }
  };

  const fetchManagerAccounts= async () => {
    try {
      const accessToken = localStorage?.getItem("accesstoken_Google") ?? "";
      const response = await GetManagerAccounts(accessToken);
      if (response.statusCode == "200") {
        setManagerAccounts(response.responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen("paper")}
        variant="contained"
        color="secondary"
        sx={{ marginLeft: "10px" }}
      >
        Select Manager Account
      </Button>
      <span
        style={{
          display: "inline-block",
          fontSize: "12px",
          color: "#FFA500",
          marginTop: "5px",
          cursor: "help",
        }}
        title="You can only login if you have a manager account. If not, please create one first."
      >
        ⚠️
      </span>

      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Select Manager Account</DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          <select
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
          >
            <option value="">Select Manager Account</option>
            {managerAccounts.length === 0 && (
              <option disabled>No manager accounts available. Please create a Google manager account first.</option>
            )}
            {managerAccounts.map((manager, index) => (
              <option key={index} value={manager}>{manager}</option>
            ))}
          </select>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSelectManager} color="primary">
            Select
          </Button>
        </DialogActions>
      </Dialog>

      {openClientAccModal ? 
      <SelectClientAccountModal/> : ""}
      </React.Fragment>
  );
};


export default SelectManagerAccModal
