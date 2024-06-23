// src/FileUpload.js
import React, { useState } from 'react';
import { Button, Box, Typography, IconButton,FormLabel } from '@mui/material';
import { UploadFile, Delete } from '@mui/icons-material';

const FileUpload = ({ onFileChange, formData }) => {

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile)
    onFileChange(selectedFile);
  };

  const handleRemoveFile = () => {
    onFileChange(null);
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <FormLabel component="legend">Visiting Card</FormLabel>
      {formData.visitingCard ? (
        <Box sx={{ display: 'flex', alignItems: 'center',  justifyContent:"space-between"}}>
          <Typography variant="body1">{formData.visitingCard.name}</Typography>
          <IconButton color="error" onClick={handleRemoveFile}>
            <Delete />
          </IconButton>
        </Box>
      ) : (
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFile />}
          fullWidth
        >
          Add File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      )}
    </Box>
  );
};

export default FileUpload;
