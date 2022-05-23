import { Container, Grid, Typography, styled, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CustomTextBox from "../../sub-components/CustomTextBox";

const TextBox = styled(TextField) ({
  '& input:valid + fieldset': {
      borderColor: '#c2c2c2',
      borderWidth: 2,
  },
  '& input:invalid + fieldset': {
      borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important',
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: '#c2c2c2',
      },
      '&:hover fieldset': {
          borderColor: '#f2f2f2',
      },
      '&.Mui-focused fieldset': {
          borderColor: '#f2f2f2',
      },
    },
});

const CardDetails = ({ setDetails, currentDetails }) => {

  const handleFormChange = (e) => {
    setDetails(e);
   }
  
  return (
    <Container sx={{ display: "relative"}}>
      <Typography variant="h3" align="left">
        Card Details
      </Typography>
      <Box>
        <Grid
          container
          sx={{
            display: "relative",
            margin: "auto",
          }}
        >
          {/* Line 1 | Name on card*/}
          <Grid item xs={12}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="fullName"
              label="Full Name"
              id="fullName"
              variant="outlined"
              autoFocus
              onChange={handleFormChange}
              value={currentDetails.fullName}
            />
          </Grid>
          {/* Line 2 | Card number*/}
          <Grid item xs={12}>
          <TextBox
              margin="normal"
              required
              fullWidth
              name="cardNumber"
              label="Card Number"
              id="cardNumber"
              variant="outlined"
              onChange={handleFormChange}
              value={currentDetails.cardNumber}
            />
          </Grid>

          {/* Line 3 | Expiry date */}
          <Grid item xs={5}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="expiryDate"
              label="Expiry Date"
              id="expiryDate"
              variant="outlined"
              onChange={handleFormChange}
              value={currentDetails.expiryDate}
            />
          </Grid>

          {/* Makes a gap between fields */}
          <Grid item xs={2} />

          {/* Line 3 | Security Code */}
          <Grid item xs={5}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="securityCode"
              label="Security Code"
              id="securityCode"
              variant="outlined"
              onChange={handleFormChange}
              value={currentDetails.securityCode}
            />
          </Grid>

        </Grid>
      </Box>
    </Container>
    );
}
 
export default CardDetails;