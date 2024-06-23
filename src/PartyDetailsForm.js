// src/PartyDetailsForm.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import FileUpload from './FileUpload';

const PartyDetailsForm = ({formData,handleChange, onBack, onNext, onClear ,handleFileChange}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    onNext(formData);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          p: 4,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Order Form #{formData.orderNo}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Party Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FileUpload  onFileChange={handleFileChange} formData={formData}/>
          {/* <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add file
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button> */}
          <TextField
            label="Remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Grid container spacing={4} sx={{ mt: 3 }}>
           
            <Grid item xs={4}>
           <Button
            color="error"
            fullWidth
            onClick={onClear}
            >
           Cancel
            </Button>
           </Grid>
           <Grid item xs={4}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={onBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
     
    </Container>
  );
};

export default PartyDetailsForm;
