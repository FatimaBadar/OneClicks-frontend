 'use client'
import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { useRouter } from 'next/router';

const CreateCampaign = () => {
  const router = useRouter();
  const [campaignName, setCampaignName] = useState('');
  const [objective, setObjective] = useState('');
  const [status, setStatus] = useState('');
  const [specialAdCategory, setSpecialAdCategory] = useState('');

  const handleNextClick = () => {
    console.log('Form Submitted:', {
      campaignName,
      objective,
      status,
      specialAdCategory,
    });
    router.push('/AdSetPage');
    // window.location.href = './AdSetPage';
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
        backgroundColor: '#ADD8E6', // Light purple background color
      }}
    >
      <TextField
        fullWidth
        label="Campaign Name"
        variant="outlined"
        margin="normal"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
      />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Objective</InputLabel>
        <Select
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          label="Objective"
        >
          <MenuItem value="objective1">Objective 1</MenuItem>
          <MenuItem value="objective2">Objective 2</MenuItem>
          <MenuItem value="objective3">Objective 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset" fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <RadioGroup
          row
          aria-label="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ justifyContent: 'center' }} // Center the radio buttons
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

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Special Ad Category</InputLabel>
        <Select
          value={specialAdCategory}
          onChange={(e) => setSpecialAdCategory(e.target.value)}
          label="Special Ad Category"
        >
          <MenuItem value="category1">Category 1</MenuItem>
          <MenuItem value="category2">Category 2</MenuItem>
          <MenuItem value="category3">Category 3</MenuItem>
        </Select>
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

export default CreateCampaign;
