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
  const [cardDetails, setCardDetails] = useState(defaultCardValues);

  const setNewCardDetails = (event) => {
    const { name, value } = event.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  let navigate = useNavigate();

  const handleBack = () => {
    let path = "/customer/profile";
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
              // value={currentDetails.fullName}
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
              // value={currentDetails.cardNumber}
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
              // value={currentDetails.expiryDate}
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
              // value={currentDetails.securityCode}
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
