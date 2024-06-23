// src/App.js
import React, { useState, useEffect } from 'react';
import OrderRequestForm from './OrderRequestForm';
import PartyDetailsForm from './PartyDetailsForm';
import {DESIGN_COLOR_MAP, NONE} from './data/designColorMapping'
import OrderSummary from './OrderSummary';
import SaveResult from './SaveResult';
import { useGoogleSheets } from './useGoogleSheets';
import FullFeaturedCrudGrid from './FullFeaturedCrudGrid'
import {
    Container,
    Typography,
    Box,
    Grid,
    Button,
  } from '@mui/material';

function OldForm() {
    const [formData, setFormData] = useState({
        orderNo: 0,
        designNo: '',
        quantityUnit: 'set',
        quantityAmount: '',
        rate: '',
        colorOptions: {
            "none": true
        },
        orderRemarks: '',
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        visitingCard: null,
      });

    const [availableColors, setAvailableColors] = useState([NONE]);
    const [result, setResult] = useState("");
    const { isSignedIn, signIn, signOut, appendRow, getLastOrderNumber } = useGoogleSheets();
    const [step, setStep] = useState(1);

    useEffect(() => {
    if (formData.designNo && DESIGN_COLOR_MAP[formData.designNo]) {
        const colors = DESIGN_COLOR_MAP[formData.designNo].reduce(
        (acc, color) => ({ ...acc, [color]: false }),
        {}
        );
        setAvailableColors(DESIGN_COLOR_MAP[formData.designNo]);
        setFormData((prev) => ({
        ...prev,
        colorOptions: colors,
        }));
        
    } else {
        setAvailableColors([NONE]);
        setFormData((prev) => ({
        ...prev,
        colorOptions: {
            "none": true
        },
        }));
    }
    
    }, [formData.designNo]);

   const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        colorOptions: { ...formData.colorOptions, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = (formData) => {
    console.log('Form Data:', formData);
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleClear = () => {
    setFormData({
        designNo: '',
        quantityUnit: 'set',
        quantityAmount: '',
        rate: '',
        colorOptions: {
            "none": true
        },
        orderRemarks: '',
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        visitingCard: null,
    });
    setStep(1);
    setResult("");
  };

  const handleFileChange = (file) => {
    setFormData({ ...formData, visitingCard: file });
  };
  
  useEffect(() => {
    console.log("fetchlastorderno")
    const fetchLastOrderNumber = async () => {
        console.log(isSignedIn)
        console.log(step)
      if (isSignedIn && step ==1) {
        console.log("fetchinglastorderno")
        const lastOrderNumber = await getLastOrderNumber();
        console.log("lastOrderNumber" + lastOrderNumber)
        setFormData((prevData) => ({
          ...prevData,
          orderNo: lastOrderNumber + 1,
        }));
      }
    };
    fetchLastOrderNumber();
  }, [isSignedIn, step]);

  useEffect(() => {
   console.log(formData)
  }, [formData]);

  const handleSaveForm = ()=>{
    submitResponseToGoogleSheets()
  }

  const submitResponseToGoogleSheets = async ()=> {
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
          orderNo,
        } = formData;
    
        const colorOptionsArray = Object.keys(colorOptions)
          .filter((color) => colorOptions[color])
          .join(', ');
    
        try {
          await appendRow([
            orderNo,
            designNo,
            quantityUnit,
            quantityAmount,
            rate,
            colorOptionsArray,
            orderRemarks,
            name,
            phoneNumber,
            email,
            address,
            visitingCard ? 'Uploaded' : 'Not Uploaded',
          ]);
          setResult("success");
          setStep(4);
        } catch (error) {
          console.error('Error saving data to Google Sheets:', error);
          setResult("failure");
          setStep(4);
        }
  }

  const onRetry = () => {
    setResult("failure");
    handleSaveForm()
  }

  const onNewResponse = () =>{
    handleClear();
  }
  if (!isSignedIn) {
    return (
        <>
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
        // <FullFeaturedCrudGrid/>
        <OrderRequestForm formData={formData} handleChange={handleChange} onNext={handleNext} onClear={handleClear} availableColors={availableColors} />
      )}
      {step === 2 && (
        <PartyDetailsForm formData={formData} handleChange={handleChange} onBack={handleBack} onNext={handleNext} onClear={handleClear} handleFileChange={handleFileChange}/>
      )}
      {step == 3 && (
        <Grid>
           <OrderSummary formData={formData}  onBack={handleBack} onSave ={handleSaveForm} onClear={handleClear}/>
        </Grid>
      )} 
      {/* employee name dropdown, exhibition name dropdown */}
      {step == 4 && (
        <Grid>
           <SaveResult formData={formData} result={result} onRetry={onRetry} onNewResponse={onNewResponse} />
        </Grid>
      )} 
      </>
  );
}

export default Form;
