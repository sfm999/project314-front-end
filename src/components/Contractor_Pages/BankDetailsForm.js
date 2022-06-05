import {
  Box,
  Container,
  Dialog,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
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

const BankDetailsForm = ({
  bankDetailsOpen,
  handleBankSubmit,
  handleClose,
}) => {
  const handleSubmit = (event) => { //submits the bank details
    handleBankSubmit(event);
  };

  const handleDetailsClose = () => {
    handleClose();
  };

  return (
    /*The Dialog form to change the contractor bank details */
    <Dialog
      component="form"
      noValidate
      onSubmit={handleSubmit}
      open={bankDetailsOpen}
      onClose={handleDetailsClose}
    >
      <Container sx={{p: 3}}>
        <Box>
          <Grid
            container
            spacing={2}
            justifyContent="right"
            sx={{
              display: "relative"
            }}
          >
            <Grid item xs={12}>
              <Typography variant="h5">Bank Details</Typography>
            </Grid>

            <Grid item xs={12}>
              {/*text box for teh account number*/}
              <TextBox
                margin="normal"
                required
                fullWidth
                name="accountNumber"
                label="Account Number"
                type="number"
                id="accountNumber"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={4}>
              {/*Text box for the BSB*/}
              <TextBox
                margin="normal"
                required 
                fullWidth
                name="BSB"
                label="BSB"
                id="BSB"
                type="number" 
                variant="outlined"
              />
            </Grid>
            <Grid item xs={8} />

            <Grid item>
              <CustomButton
              //closes the details dialog 
                text="exit"
                onClick={handleDetailsClose}
                size="large"
              />
            </Grid>
            <Grid item>
              {/*Submits the changed bank details */}
              <CustomButton text="submit" size="large" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Dialog>
  );
};

export default BankDetailsForm;
