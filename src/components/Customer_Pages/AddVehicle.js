import {
  CssBaseline,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";
import CustomButton from "../sub-components/CustomButton";

import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";

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

const defaultValues = {
  make: "",
  model: "",
  rego: "",
  colour: "",
  year: "",
};

const AddVehicle = () => {
  const { userID } = useAuth();

  const [formValues, setFormValues] = useState(defaultValues);

  let navigate = useNavigate();
  const handleBackClick = (e) => {
    e.preventDefault();
    const path = "/customer/profile";
    navigate(path);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refresh

    // Create object containing values to be submitted to API
    const submitData = {
      ...formValues,
      user: userID,
    };

    // API call to add a new vehicle to the customer's list of vehicles
    axios.post(`users/vehicles/`, submitData).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      }
    });
    // Navigate back to the profile page
    navigate("/customer/profile");
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
        Add a new vehicle
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
                <CustomButton
                  text="Go Back"
                  onClick={handleBackClick}
                  size="large"
                />
              </Grid>
            </Grid>

            {/* Get vehicle Make  */}
            <Grid item xs={6}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="make"
                label="Vehicle Make"
                id="make"
                variant="outlined"
                autoFocus
                onChange={handleFormChange}
              />
            </Grid>

            {/* Get vehicle Model  */}
            <Grid item xs={6}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="model"
                label="Vehicle Model"
                id="model"
                variant="outlined"
                onChange={handleFormChange}
              />
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

            {/* Get vehicle Year  */}
            <Grid item xs={6}>
              <TextBox
                margin="normal"
                required
                fullWidth
                name="year"
                label="Vehicle Year"
                id="year"
                variant="outlined"
                onChange={handleFormChange}
              />
            </Grid>

            {/* Serves to push the year textfield to the left with breakpoint technology */}
            <Grid item xs={6} />

            {/* Add vehicle button/form control submit */}
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <CustomButton text="Add Vehicle" type="submit" />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AddVehicle;
