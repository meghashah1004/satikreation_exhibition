// src/OrderSummary.js
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const OrderSummary = ({ formData, onBack, onSave,onClear }) => {
  const {
    designNo,
    quantityUnit,
    quantityAmount,
    rate,
    colorOptions,
    orderRemarks,
    name,
    phoneNumber,
    email,
    address,
    visitingCard,
  } = formData;

  const colorOptionsArray = Object.keys(colorOptions)
    .filter((color) => colorOptions[color])
    .map((color) => color.charAt(0).toUpperCase() + color.slice(1));

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
          Order Summary #{formData.orderNo}
        </Typography>
        <Typography variant="subtitle1" component="h1" gutterBottom align="left">
          Order Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Design No" secondary={designNo} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Quantity Unit" secondary={quantityUnit} />
            <ListItemText primary="Quantity Amount" secondary={quantityAmount} />
            <ListItemText primary="Rate" secondary={rate} prefix='Rs'/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Color Options" secondary={colorOptionsArray.join(', ')} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Order Remarks" secondary={orderRemarks} />
          </ListItem>
        </List>
        <Typography variant="subtitle1" component="h1" gutterBottom align="left">
          Party Details
        </Typography>
        <List>
        <ListItem>
            <ListItemText primary="Name" secondary={name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone Number" secondary={phoneNumber} />
            <ListItemText primary="Email" secondary={email || 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Address" secondary={address} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Visiting Card" secondary={visitingCard ? 'Uploaded' : 'Not Uploaded'} />
          </ListItem>
        </List>
        <Grid container spacing={2} sx={{ mt: 3 }}>
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
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onClear}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderSummary;
