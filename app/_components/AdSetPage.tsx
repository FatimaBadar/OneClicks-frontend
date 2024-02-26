import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';

const AdsetForm = () => {
  const [adsetName, setAdsetName] = useState('');
  const [optimizationGoal, setOptimizationGoal] = useState('');
  const [billingEvent, setBillingEvent] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [dailyBudget, setDailyBudget] = useState('');
  const [geolocations, setGeolocations] = useState('');
  const [interests, setInterests] = useState('');
  const [startTime, setStartTime] = useState('');
  const [status, setStatus] = useState('');

  const handleNextClick = () => {
    // You can perform actions like sending data to your backend/API here
    console.log('Form Submitted:', {
      adsetName,
      optimizationGoal,
      billingEvent,
      bidAmount,
      dailyBudget,
      geolocations,
      interests,
      startTime,
      status,
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        marginTop: 4,
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ADD8E6',
      }}
    >
      <TextField
        fullWidth
        label="Adset Name"
        variant="outlined"
        margin="normal"
        value={adsetName}
        onChange={(e) => setAdsetName(e.target.value)}
      />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Optimization Goal</InputLabel>
        <Select
          value={optimizationGoal}
          onChange={(e) => setOptimizationGoal(e.target.value)}
          label="Optimization Goal"
        >
          {/* Add your optimization goal options here */}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Billing Event</InputLabel>
        <Select
          value={billingEvent}
          onChange={(e) => setBillingEvent(e.target.value)}
          label="Billing Event"
        >
          {/* Add your billing event options here */}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Bid Amount"
        type="number"
        variant="outlined"
        margin="normal"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />

      <TextField
        fullWidth
        label="Daily Budget"
        type="number"
        variant="outlined"
        margin="normal"
        value={dailyBudget}
        onChange={(e) => setDailyBudget(e.target.value)}
      />

      {/* You may need to implement a more complex component for geolocations and interests */}
      <TextField
        fullWidth
        label="Geolocations"
        variant="outlined"
        margin="normal"
        value={geolocations}
        onChange={(e) => setGeolocations(e.target.value)}
      />

      <TextField
        fullWidth
        label="Interests"
        variant="outlined"
        margin="normal"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
      />

      <TextField
        fullWidth
        label="Start Time"
        type="datetime-local"
        variant="outlined"
        margin="normal"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <FormControl component="fieldset" fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <RadioGroup
          row
          aria-label="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ justifyContent: 'center' }}
        >
          <FormControlLabel
            value="ACTIVE"
            control={<Radio />}
            label="Active"
            sx={{ marginRight: '20px' }}
          />
          <FormControlLabel value="PAUSED" control={<Radio />} label="Paused" />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleNextClick}
        sx={{ marginTop: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default AdsetForm;
