// src/OrderRequestForm.js
import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import FullFeaturedCrudGrid from "./FullFeaturedCrudGrid";

const FormFields = ({
  formData,
  rows,
  setRows,
  handleChange,
  onSave,
  onClear,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    onSave(formData);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Order Form #{formData.orderNo}
        </Typography>
        <Typography variant="subtitle2" align="center"></Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="subtitle1" gutterBottom>
            Party Details
          </Typography>
          <Grid
            container
            spacing={1}
            style={{ paddingTop: 10 }}
            justifyContent={"center"}
          >
            <Grid item xs={12}>
              <TextField
                label="Purchaser"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contact"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GSTIN"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Agent"
                name="agent"
                value={formData.agent}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
         
          <Grid
            container
            spacing={2}
            sx={{ mt: 3 }}
            style={{ padding: 15 }}
          >
             <Typography
            variant="subtitle1"
            gutterBottom
            style={{ paddingTop: 10 }}
          >
            Order Details
          </Typography>
            <FullFeaturedCrudGrid
              rows={rows}
              setRows={setRows}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }} justifyContent={"center"}>
            <Grid item xs={4}>
              <Button color="error" fullWidth onClick={onClear}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onSave}
                // type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default FormFields;
