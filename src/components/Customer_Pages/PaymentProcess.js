import { Card, Container, CssBaseline, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { SelectPaymentPlan, CardDetails, PersonalDetails, ReviewPaymentProcess } from './Payment_Process_Pages';
import CustomButton from "../sub-components/CustomButton";
import { useNavigate } from "react-router";

const paymentDetails = {
  defaultPersonalDetails: {
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    fax: "",
  },
  defaultCardDetails: {
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
    postcode: "",
  },
  subStatus: "",
}

const PaymentProcess = () => {

  const [cardDetails, setCardDetails] = useState(paymentDetails.defaultCardDetails);
  const [personalDetails, setPersonalDetails] = useState(paymentDetails.defaultPersonalDetails);
  const [subStatus, setSubStatus] = useState(paymentDetails.subStatus);

  const setNewCardDetails = (event) => {
    const { name, value } = event.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  }

  const setNewPersonalDetails = (event) => {
    const { name, value } = event.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value,
    }) 
  }

  const setNewSubStatus = (text) => {
    setSubStatus(text);
  }

  function getStepContent(step) {
    switch(step) {
      case 0:
        return <SelectPaymentPlan subStatus={subStatus} setSubStatus={setNewSubStatus}/>;
      case 1:
        return <CardDetails setDetails={setNewCardDetails} currentDetails={cardDetails} />;
      case 2:
        return <PersonalDetails setDetails={setNewPersonalDetails} currentDetails={personalDetails}/>;
      case 3:
        return <ReviewPaymentProcess />;
      default:
        return "unknown step";
    }
  }

  let navigate = useNavigate()

  const [activeStep, setActiveStep] = useState(0)

  const handleExit = () => {
    let path = "/customer/profile"
    navigate(path)
  }

  const handleNext = () => {

    if(activeStep < 3) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    
    if(activeStep === 3) {
      console.log(personalDetails);
      console.log(cardDetails);
      console.log(subStatus);
    }
  }

  const handleBack = () => {
    if(activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  }

  const handleReset = () => {
    setActiveStep(0);
  }

  const steps = [ "Choose Payment Plan", "Card Details", "Billing Address", "Review"]

  return (
    <Card
      sx={{
        width: "90%",
        marginTop: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "auto",
        paddingTop: "10px",
        boxShadow: "0",
      }}
    >
      <CustomButton text="exit" onClick={handleExit} size="large" />
      <CssBaseline />
      {/* Holds the main workable area */}
        <Grid container justifyContent="space-evenly" spacing={2}>
          {/* The stepper itself */}
          <Grid item xs={12}>
            <Container sx={{ marginBottom: "10px"}}>
              <Stepper activeStep={activeStep} >
                {steps.map((label, index) =>{
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </Container>
          </Grid>

          {/* This is where the content for each step is stored */}
          <Grid item xs={12} >
            <Container>
              <Card sx={{width: "100%",  display: "flex"}}>
                {getStepContent(activeStep)}
              </Card>
            </Container>
          </Grid>
          
          {/* Holds the buttons for navigating the pages */}
          <Container sx={{ margin: "10px", }}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <CustomButton text="back" size="large" onClick={handleBack} />
              </Grid>
              <Grid item>
                <CustomButton text="next" size="large" onClick={handleNext} />
              </Grid>
            </Grid>
          </Container>
        </Grid>
    </Card>
    );
}
 
export default PaymentProcess;

