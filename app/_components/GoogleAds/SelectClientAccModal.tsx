import React, { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Toast } from "primereact/toast";
import { GetClientAccounts } from "@/app/_services/googleService";
import { AccountHierarchyDto } from "@/app/_models/Google.model";

interface SelectClientAccountModalProps {
  open: boolean;
  onClose: () => void;
  managerIds: string; // Define managerIds prop
}

const SelectClientAccountModal: React.FC<SelectClientAccountModalProps> = ({
  open,
  onClose,
  managerIds,
}) => {
  const [selectedClient, setSelectedClient] =
    useState<AccountHierarchyDto | null>(null);
  const [clientAccounts, setClientAccounts] = useState<AccountHierarchyDto[]>(
    []
  );
  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchClientAccounts();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      localStorage.setItem(
        "g_ClientId",
        selectedClient.customerId.toString()
      );
      const idPart = managerIds.split("/")[1]; // Split the string by '/' and take the second part
      const id = parseInt(idPart, 10);
      localStorage.setItem("g_ManagerId", id.toString());
    }
  }, [selectedClient]);

  const handleSelectClient = () => {
    if (selectedClient) {
      onClose();
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Please select a client account",
        life: 30000,
      });
    }
  };

  const fetchClientAccounts = async () => {
    try {
      const accessToken = localStorage?.getItem("accesstoken_Google") ?? "";
      // Pass managerIds to GetCLientAccounts function
      const response = await GetClientAccounts(accessToken, managerIds);
      if (response.statusCode == "200") {
        setClientAccounts(response.responseData[0].childAccounts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Select Client Account</DialogTitle>
      <DialogContent>
        <select
          value={selectedClient ? selectedClient.customerId.toString() : ""}
          onChange={(e) => {
            const selectedAccountId = e.target.value;
            const selectedAccount =
              clientAccounts.find(
                (account) => account.customerId.toString() === selectedAccountId
              ) || null;
            setSelectedClient(selectedAccount);
          }}
        >
          <option value="">Select Client Account</option>
          {clientAccounts.length === 0 && (
            <option disabled>
              No client accounts available. Please create a Google client
              account first.
            </option>
          )}
          {clientAccounts.map((client, index) => (
            <option key={index} value={client.customerId.toString()}>
              {client.descriptiveName}
            </option>
          ))}
        </select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={handleSelectClient} color="primary">
          Select
        </Button>
      </DialogActions>
      <Toast ref={toast} />
    </Dialog>
  );
};

export default SelectClientAccountModal;
