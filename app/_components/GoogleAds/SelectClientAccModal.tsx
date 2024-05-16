import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {
  CreateClientAccountService,
  GetClientAccounts,
} from "@/app/_services/googleService";
import { AccountHierarchyDto } from "@/app/_models/Google.model";
import { CircularProgress, Container } from "@mui/material";
import SuccessSnackbar from "../SuccessSnackbarComponent";
import FailureSnackbar from "../FailureSnackbarComponent";

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
  const [clientId, setClientId] = useState<string>("");

  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchClientAccounts();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      localStorage.setItem("g_ClientId", selectedClient.customerId.toString());
      const idPart = managerIds.split("/")[1]; // Split the string by '/' and take the second part
      const id = parseInt(idPart, 10);
      localStorage.setItem("g_ManagerId", id.toString());
    }
  }, [selectedClient]);

  const handleSelectClient = () => {
    if (selectedClient) {
      setSuccess(true);
      setMessage("Successfully selected a client account");
      onClose();
    } else {
      setFailure(true);
      setMessage("Please select a client account");
    }
  };

  const fetchClientAccounts = async () => {
    try {
      setLoader(true)
      const accessToken = localStorage?.getItem("accesstoken_Google") ?? "";
      const response = await GetClientAccounts(accessToken, managerIds);
      if (response.statusCode == "200") {
        setClientAccounts(response.responseData[0].childAccounts);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  };

  const createClientAccount = async () => {
    try {
      const accessToken = localStorage?.getItem("accesstoken_Google") ?? "";

        const response = await CreateClientAccountService(
        accessToken,
        managerIds
      );
      if (response.statusCode == "200") {
        const parts = response.responseData.split("/")
        setClientId(parts[1]);

        localStorage.setItem("g_ClientId", parts[1]);
        const idPart = managerIds.split("/")[1]; // Split the string by '/' and take the second part
        const id = parseInt(idPart, 10);
        localStorage.setItem("g_ManagerId", id.toString());
        onClose();

      }
    } catch (error) {
      console.log(error);
    }
    // return clientId.toString()
  };
  // const handleClientChange = (e: React.ChangeEvent<{ value: unknown }>) => {
  //   const selectedAccountId = e.target.value as string;

  //   const selectedAccount =
  //     clientAccounts.find(
  //       (account) => account.customerId.toString() === selectedAccountId
  //     ) || null;
  //     if(selectedAccount == null){
  //       createClientAccount();
  //     }
  //   setSelectedClient(selectedAccount);
  // };
  
  return (
    <>
    {loader ? (
      <Container
        maxWidth={false}
        sx={{ display: "flex", width: "fit-content", mt: "20%" }}
      >
        <CircularProgress />
      </Container>
    ) : (
      <>
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Select Client Account</DialogTitle>
      <DialogContent>
        <select
          value={selectedClient ? selectedClient.customerId.toString() : ""}
          // onChange={handleClientChange}

          onChange={(e) => {
            const selectedAccountId = e.target.value;
            const selectedAccount =
              clientAccounts.find(
                (account) => account.customerId.toString() === selectedAccountId
              ) || null;
            setSelectedClient(selectedAccount);
          }}
        >
          <option value={""}>Select Client Account</option>
          {clientAccounts.length === 0 && (
            <option value="">
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
        <Button onClick={createClientAccount} color="primary">
          Create Client
        </Button>
        <Button onClick={handleSelectClient} color="primary">
          Select
        </Button>
      </DialogActions>
    </Dialog>
    </>
      )}
      {success ? <SuccessSnackbar openBar={success} message={message} /> : ""}
      {failure ? <FailureSnackbar openBar={failure} message={message} /> : ""}
    </>
  );
};

export default SelectClientAccountModal;
