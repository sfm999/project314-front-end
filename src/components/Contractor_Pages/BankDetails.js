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

const defaultBankDetails = {
  accountName: "",
  accountNumber: "",
  BSB: "",
};

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState(defaultBankDetails);

  const setNewBankDetails = (event) => {
    const { name, value } = event.target;
    setBankDetails({
      ...bankDetails,
      [name]: value,
    });
  };

  let navigate = useNavigate();

  const handleExit = () => {
    const path = "/contractor/profile";
    navigate(path);
  };

  /* 
    @KAINE
    Do the API call here to update the bank details
  */
  const handleSubmit = () => {
    console.log(bankDetails);
  };

  return (
    <Container sx={{ display: "relative" }}>
      <Typography variant="h3" align="left">
        Bank Details
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
          <Grid item>
            <CustomButton text="exit" onClick={handleExit} size="large" />
          </Grid>
          {/* Line 1 | Name on card*/}
          <Grid item xs={12}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="accountName"
              label="Account Name"
              id="accountName"
              variant="outlined"
              autoFocus
              onChange={setNewBankDetails}
              // value={currentDetails.fullName}
            />
          </Grid>
          {/* Line 2 | Card number*/}
          <Grid item xs={12}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="accountNumber"
              label="Account Number"
              type="number"
              id="accountNumber"
              variant="outlined"
              onChange={setNewBankDetails}
              // value={currentDetails.cardNumber}
            />
          </Grid>

          {/* Line 3 | BSB Number */}
          <Grid item xs={2}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="BSB"
              label="BSB"
              id="BSB"
              type="number"
              variant="outlined"
              onChange={setNewBankDetails}
              // value={currentDetails.expiryDate}
            />
          </Grid>
          <Grid item xs={10} />
          <Grid item>
            <CustomButton text="submit" onClick={handleSubmit} size="large" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BankDetails;
