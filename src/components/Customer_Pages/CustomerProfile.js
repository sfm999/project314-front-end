
import { Button, Container, Grid } from "@mui/material";
import React from "react";
import Details from "./Details";
import { useNavigate } from "react-router-dom";

const CustomerProfile = ({ customer }) => {
 
  // Handle changing url with router v6 useNavigate insted of useHistory
  let navigate = useNavigate();

  const handleVehicleClick = () => {
    let path = '/manageVehicles'
    navigate(path)
  }

  const handlePaymentPlanClick = () => {
    let path = '/paymentProcess'
    navigate(path)
  }

  return (
    <Container maxWidth="100%" sx={{ width: "90%", paddingTop: "20px"}}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3}} alignItems="stretch">
        <Grid item xs={8}>
          <Details customer={customer} />
        </Grid>
        <Grid container item xs={4} >
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="outlined"
            sx={{
              color: "black",
              border: "1px solid black",
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
                border: "none"
              },
              mb: 2,
            }}
            onClick={handleVehicleClick}
          >Manage Current Vehicles</Button>
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="outlined"
            sx={{
              color: "black",
              border: "1px solid black",
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
                border: "none"
              },
              mb: 2,
            }}
            onClick={handlePaymentPlanClick}
          >Payment Plan</Button>
          <Button 
            fullWidth
            variant="contained"
            color="error"
            size="large"
          >Delete Plan</Button>
        </Grid>
      </Grid>
    </Container>
    );
}
 
export default CustomerProfile;