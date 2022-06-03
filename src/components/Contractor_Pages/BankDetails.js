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

const BankDetails = ({contractor}) => {
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


  // const handleChangeBankDetails = async (event) => {
  //   await axios
  //     .put(`users/contractor/${profile.id}/`, {
  //       subscription_status: event.target.value,
  //     })
  //     .then((response) => {
  //       fetchData();
  //     });
  // };

  /* 
    @KAINE
    Do the API call here to update the bank details
  */
  const handleSubmit = () => {
    console.log(bankDetails);
  };

  return (
    <Container sx={{ display: "relative", padding: 2 }}>
      <Typography variant="h4" align="left">
        Bank Details
      </Typography>
      <Box>
        <Grid
          container
          spacing={1}
          justifyContent="right"
          sx={{
            display: "relative",
            margin: "auto",
          }}
        >
          <Grid item xs={12}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="BSB"
              label="BSB"
              id="BSB"
              type="string"
              variant="outlined"
              onChange={setNewBankDetails}
              // value={currentDetails.expiryDate}
            />
          </Grid>

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
          <Grid item>
            <CustomButton text="exit" onClick={handleExit} size="large" />
          </Grid>
          <Grid item>
            <CustomButton text="submit" onClick={handleSubmit} size="large" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BankDetails;
