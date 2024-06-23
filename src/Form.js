// src/App.js
import React, { useState, useEffect } from "react";
import FormFields from "./FormFields";
import OrderSummary from "./OrderSummary";
import SaveResult from "./SaveResult";
import { useGoogleSheets } from "./useGoogleSheets";
import FullFeaturedCrudGrid from "./FullFeaturedCrudGrid";
import { Container, Typography, Box, Grid, Button } from "@mui/material";

function Form() {
  const [formData, setFormData] = useState({
    orderNo: 0,
    remarks: "",
    name: "",
    phoneNumber: "",
    email: "",
    gstin: "",
    city: "",
    agent: "",
  });

  const [rows, setRows] = React.useState([]); // orderItems

  const [result, setResult] = useState("");
  const { isSignedIn, signIn, signOut, appendRow, getLastOrderNumber } =
    useGoogleSheets();
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleAddItems = (newItems) => {
    setFormData((prevData) => ({
      ...prevData,
      items: newItems //[...prevData.items, newItem],
    }));
  };
  const handleNext = (formData) => {
    console.log("Form Data:", formData);
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleClear = () => {
    setFormData({
      orderNo: 0,
      remarks: "",
      name: "",
      phoneNumber: "",
      email: "",
      gstin: "",
      city: "",
      agent: "",
    });
    setRows([]);
    setStep(1);
    setResult("");
  };

  useEffect(() => {
    console.log("fetchlastorderno");
    const fetchLastOrderNumber = async () => {
      console.log(isSignedIn);
      console.log(step);
      if (isSignedIn && step == 1) {
        console.log("fetchinglastorderno");
        const lastOrderNumber = await getLastOrderNumber();
        console.log("lastOrderNumber" + lastOrderNumber);
        setFormData((prevData) => ({
          ...prevData,
          orderNo: lastOrderNumber + 1,
        }));
      }
    };
    fetchLastOrderNumber();
  }, [isSignedIn, step]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSaveForm = () => {
    submitResponseToGoogleSheets();
  };

  const submitResponseToGoogleSheets = async () => {
    const {
      orderNo,
      remarks,
      name,
      phoneNumber,
      email,
      gstin,
      city,
      agent,
    } = formData;

    let records = rows.map(item => [
      orderNo,
      item.design,
      item.quantity,
      item.rate,
      item.colorOptions,
      remarks,
      name,
      phoneNumber,
      email,
      gstin,
      city,
      agent
    ]);
    try {
      await appendRow(records);
      setResult("success");
     
    } catch (error) {
      console.error('Error saving data to Google Sheets:', error);
      setResult("failure");
    }
    setStep(2);
  };

  const onRetry = () => {
    setResult("failure");
    handleSaveForm();
  };

  const onNewResponse = () => {
    handleClear();
  };

  if (!isSignedIn) {
    return (
      <>
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
          <Box
            sx={{
              p: 4,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Sign In
            </Typography>
            <Button variant="contained" color="primary" onClick={signIn}>
              Sign in with Google
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      {step === 1 && (
        <FormFields
          formData={formData}
          handleChange={handleChange}
          onSave={handleSaveForm}
          onClear={handleClear}
          rows={rows}
          setRows={setRows}
        />
      )}
      {/* employee name dropdown, exhibition name dropdown */}
      {step == 2 && (
        <Grid>
          <SaveResult
            formData={formData}
            result={result}
            onRetry={onRetry}
            onNewResponse={onNewResponse}
          />
        </Grid>
      )}
    </>
  );
}

export default Form;
