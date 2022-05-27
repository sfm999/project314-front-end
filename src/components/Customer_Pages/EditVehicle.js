import {
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container, styled } from "@mui/system";
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

// Dummy data just to see if the values change when editing form
const customerVehicle = {
  make: "toyota",
  model: "corolla",
  rego: "rgy672",
  colour: "red",
  year: 1998,
};

const EditVehicle = () => {
  const [formValues, setFormValues] = useState(customerVehicle);

  // Handle page change (back button)
  let navigate = useNavigate();
  const handleBackClick = (e) => {
    e.preventDefault(); // Prevent form cancellation
    let path = "/customer/vehicles/manage";
    navigate(path);
  };

  // Each time a form field changes, grab the name of the input
  // and the content (value). Then use name as an indexer for the keys
  // and for the object and set the content as its value ([key]:value)
  // Also use spread operator to make sure new custom object
  // has the same keys as the formValues we're changing the values for
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Honestly I don't think the const data bit is necessary as
  // from what I understand, the handleFormChange takes care of grabbing
  // any content onChange.
  const handleSubmit = (e) => {
    e.preventDefault(); // Don't refresh :)
    console.log(formValues);
  };

  return (
    <Box
      style={{
        height: "60vh",
        width: "90%",
        margin: "auto",
        paddingTop: "10px",
      }}
    >
      <CssBaseline />

      <Typography component="h1" variant="h3">
        Edit a vehicle
      </Typography>
      <Box
        sx={{
          marginTop: "10px",
          display: "relative",
          flexDirection: "column",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={10}
            justifyContent="space-evenly"
          >
            {/* Go back button */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <CustomButton text="Go Back" onClick={handleBackClick} />
              </Grid>
            </Grid>

            {/* Get vehicle registration  */}
            <Grid item xs={6}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="rego"
                label="Vehicle Registration"
                id="rego"
                variant="outlined"
                onChange={handleFormChange}
              />
            </Grid>

            {/* Get vehicle colour  */}
            <Grid item xs={6}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="colour"
                label="Vehicle Colour"
                id="colour"
                variant="outlined"
                onChange={handleFormChange}
              />
            </Grid>

            {/* Add vehicle button/form control submit */}
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <CustomButton text="Save edits" type="submit" />
              </Grid>
              <Grid item>
                <CustomButton text="discard edits" onClick={handleBackClick} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default EditVehicle;
