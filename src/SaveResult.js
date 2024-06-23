// src/SaveResult.js
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
} from '@mui/material';

const SaveResult = ({ formData,result, onRetry, onNewResponse }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          p: 4,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        {result=="success" ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Success!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Order {formData.orderNo} has been saved successfully.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Failed!
            </Typography>
            <Typography variant="body1" gutterBottom>
              There was an error saving your order. Please try again.
            </Typography>
          </>
        )}
        <Grid container spacing={2} sx={{ mt: 3 }} justifyContent={"center"}>
          {result!="success" &&<Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onRetry}
            >
              Retry
            </Button>
          </Grid>
}
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onNewResponse}
            >
              New Order
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SaveResult;
