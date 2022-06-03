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
  const handleSubmit = (event) => {
    handleBankSubmit(event);
  };

  const handleDetailsClose = () => {
    handleClose();
  };

  return (
    <Dialog
      component="form"
      noValidate
      onSubmit={handleSubmit}
      open={bankDetailsOpen}
      onClose={handleDetailsClose}
    >
      <Container
        sx={{
          paddingBottom: "1%",
        }}
      >
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
              <Typography variant="h4">Bank Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="accountName"
                label="Account Name"
                id="accountName"
                type="string"
                variant="outlined"
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
              />
            </Grid>

            <Grid item xs={4}>
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
                text="exit"
                onClick={handleDetailsClose}
                size="large"
              />
            </Grid>
            <Grid item>
              <CustomButton text="submit" size="large" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Dialog>
  );
};

export default BankDetailsForm;
