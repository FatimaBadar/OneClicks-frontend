import React, { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Toast } from "primereact/toast";
import { GetCLientAccounts } from "@/app/_services/googleService";

const SelectClientAccountModal: React.FC = () => {
  const [open, setOpen] = useState(true); 
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [clientAccounts, setClientAccounts] = useState<string[]>([]);
  const toast = useRef<Toast>(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchClientAccounts();
   }, [])
    
   const handleSelectClient = () => {
     if(selectedClient){
       handleClose();
     }
     else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Please select a client account",
        life: 30000,
      });
    }
   };
 
   const fetchClientAccounts= async () => {
     try {
       const accessToken = localStorage?.getItem("accesstoken_Google") ?? "";
       const response = await GetCLientAccounts(accessToken);
       if (response.statusCode == "200") {
         setClientAccounts(response.responseData);
       }
     } catch (error) {
       console.log(error);
     }
   };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select Client Account</DialogTitle>
      <DialogContent>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">Select Client Account</option>
          {clientAccounts.length === 0 && (
            <option disabled>
              No client accounts available. Please create a Google client
              account first.
            </option>
          )}
          {clientAccounts.map((client, index) => (
            <option key={index} value={client}>
              {client}
            </option>
          ))}
        </select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSelectClient} color="primary">
          Select
        </Button>
      </DialogActions>
      <Toast ref={toast} />
    </Dialog>
  );
};

export default SelectClientAccountModal;
