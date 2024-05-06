import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/router"; 

const SelectClientAccountModal: React.FC = () => {
  const [open, setOpen] = useState(true); 
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [clientAccounts, setClientAccounts] = useState<string[]>([]);
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectClient = () => {
    if (selectedClient) {
      router.push(`/AnotherComponent?client=${selectedClient}`);
    } else {
      // Show a toast or alert indicating that no client account is selected
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Please select a client account",
        life: 30000,
      });
    }
  };

  const fetchClientAccounts = () => {
    // Logic to fetch client accounts from API or local storage
    const mockClientAccounts = ["Client Account 1", "Client Account 2"]; 
    setClientAccounts(mockClientAccounts);
  };

  React.useEffect(() => {
    fetchClientAccounts(); 
  }, []);

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
