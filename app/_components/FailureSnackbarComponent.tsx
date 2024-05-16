import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


interface SnackbarProps {
  openBar: boolean;
  message: string
}
const FailureSnackbar: React.FC<SnackbarProps> = ({ openBar, message }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(()=> {
    if(openBar){
      handleClick()
    }
  }, [])

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default FailureSnackbar;