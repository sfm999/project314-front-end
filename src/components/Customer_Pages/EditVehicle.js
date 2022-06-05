import { CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "../../utils/axios";
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

// Dummy data just to see if the values change when editing form.
// Serves for form handling even without default values
const customerVehicle = {
  make: "toyota",
  model: "corolla",
  rego: "rgy672",
  colour: "red",
  year: 1998,
};

const EditVehicle = () => {
  // Grab the vehicle id from the url parameters
  const { vehicleID } = useParams();

  // Holds the form data
  const [formValues, setFormValues] = useState(customerVehicle);

  // Handle page change (back button)
  let navigate = useNavigate();
  const handleBackClick = (e) => {
    e.preventDefault(); // Prevent form cancellation
    const path = "/customer/profile"; // Navigate to customer profile
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Don't refresh :)

    // Submit the new vehicle details to the API for appendment to existing entry
    axios.put(`users/vehicles/${vehicleID}/`, formValues).then((response) => {
      const path = "/customer/profile";
      navigate(path);
    });
  };

  // Grab the vehicle from the API using the vehicleID we got from the url params
  const fetchVehicle = async () => {
    axios.get(`users/vehicles/${vehicleID}`).then((response) => {
      setFormValues(response.data);
    });
  };

  // Invoke the fetchVehicle() function on page load
  useEffect(() => {
    fetchVehicle();
  }, []);

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
                value={formValues.rego}
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
                value={formValues.colour}
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
