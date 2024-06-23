// src/OrderRequestForm.js
import React, { useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Checkbox,
  Button,
  Box,
} from '@mui/material';

const OrderRequestForm = ({ formData, handleChange, onNext, onClear, availableColors}) => {


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
        <Typography variant="subtitle2"  align="center">
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Order Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Design No"
            name="designNo"
            value={formData.designNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Quantity Unit</FormLabel>
            <RadioGroup
              row
              name="quantityUnit"
              value={formData.quantityUnit}
              onChange={handleChange}
            >
              <FormControlLabel
                value="set"
                control={<Radio />}
                label="Set"
              />
              <FormControlLabel
                value="pieces"
                control={<Radio />}
                label="Pieces"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label="Quantity Amount"
            type="number"
            name="quantityAmount"
            value={formData.quantityAmount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Rate"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Color Options *</FormLabel>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {availableColors.map((color) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox
                      name={color}
                      checked={formData.colorOptions[color] || false}
                      onChange={handleChange}
                    />
                  }
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                  sx={{ width: '30%' }} // Adjust the width as necessary
                />
              ))}
            </Box>
          </FormControl>
          <TextField
            label="Remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        <Grid container spacing={2} sx={{ mt: 3 }} justifyContent={"center"}>
        <Grid item xs={4}>
           <Button
            color="error"
            fullWidth
            onClick={onClear}
            >
           Cancel
            </Button>
           </Grid>
            <Grid item xs={6}>
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
      {/* <Grid container spacing={2} style={{"paddingTop": 10}} justifyContent={"start"} flexWrap={'wrap'}  >
           <Grid item xs={4}>
           <Button
            color="error"
            fullWidth
            onClick={onClear}
            >
            Clear form
            </Button>
           </Grid>
        </Grid> */}
    </Container>
  );
};

export default OrderRequestForm;
