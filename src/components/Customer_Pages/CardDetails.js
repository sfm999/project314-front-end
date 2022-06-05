import {
  Box,
  Container,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import CustomButton from "../sub-components/CustomButton";

const TextBox = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "#c2c2c2",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#c2c2c2",
    },
    "&:hover fieldset": {
      borderColor: "#f2f2f2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f2f2f2",
    },
  },
});

const defaultCardValues = {
  fullName: "",
  cardNumber: "",
  expiryDate: "",
  securityCode: "",
};

const CardDetails = () => {
  // Holds the information for the card, as gained by the form values.
  // Populate with default blanks for security reason (can't display existing info)
  const [cardDetails, setCardDetails] = useState(defaultCardValues);

  // Update the values in cardDetails as they are entered in the form fields.
  const setNewCardDetails = (event) => {
    const { name, value } = event.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  // Allows navigation and data passing functions to other components/url's
  let navigate = useNavigate();

  // Called when the back button is called. Navigates the customer back to the profile page
  const handleBack = () => {
    const path = "/customer/profile";
    navigate(path);
  };

  /* 
    @KAINE
    I think this is where you'd have the api do the checking of the form fields possibly.
    Else we have to get a library to check these field inputs
  */
  const handleSubmit = () => {
    console.log(cardDetails);
    navigate("/customer/profile");
  };

  return (
    <Container sx={{ display: "relative" }}>
      <Typography variant="h3" align="left">
        Card Details
      </Typography>
      <Box>
        <Grid
          container
          spacing={1}
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
              onChange={setNewCardDetails}
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
              onChange={setNewCardDetails}
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
              onChange={setNewCardDetails}
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
              onChange={setNewCardDetails}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomButton text="back" onClick={handleBack} size="large" />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <CustomButton text="submit" onClick={handleSubmit} size="large" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CardDetails;
