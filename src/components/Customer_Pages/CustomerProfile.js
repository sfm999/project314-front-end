import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  ButtonGroup,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Details, ManageVehicle } from "./";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import CustomButton from "../sub-components/CustomButton";

export function CustomerProfile() {
  const isMountedRef = useIsMountedRef();

  const { userID } = useAuth();
  const [profile, setProfile] = useState();

  // Handle changing url with router v6 useNavigate insted of useHistory
  let navigate = useNavigate();

  // useCallback used to prevent useEffect infinite loop.
  // Fetch data with user provided ID (gotten on login)
  const fetchData = useCallback(async () => {
    await axios.get(`users/client/?user=${userID}`).then((response) => {
      setProfile(response.data[0]);
    });
  }, []);

  // Handles user editing card details. Redirects to page
  // containing form to record said details.
  const handleEditCardDetails = () => {
    const path = "/customer/card-details";
    navigate(path);
  };

  // Responsible for calling the fetchData function.
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handles the toggling of the buttons selecting customer's payment plan
  // Update the API with choice made
  const handlePaymentPlanChange = async (event) => {
    await axios
      .put(`users/client/${profile.id}/`, {
        subscription_status: event.target.value,
      })
      .then((response) => {
        fetchData();
      });
  };

  // Makes call to API to update the values with new values.
  // Because we populate the fields with existing values, if no change is made,
  // it updates with existing value
  const updateUserName = async (firstName, lastName, email) => {
    await axios
      .patch(`users/${userID}/`, {
        first_name: firstName,
        last_name: lastName,
        email,
      })
      .then((response) => {
        fetchData();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent refresh
    const data = new FormData(event.currentTarget); // get form data
    // call updateUserName() to update API
    updateUserName(
      data.get("first-name"),
      data.get("last-name"),
      data.get("email-address")
    );
    setDetailsOpen(false); // Close the dialog
  };

  // state and functions to handle opening and closing of dialog
  const [detailsOpen, setDetailsOpen] = useState(false);
  const handleOpen = () => setDetailsOpen(true);
  const handleClose = () => setDetailsOpen(false);

  return (
    <Box
      sx={{
        mx: "auto",
        mt: 2,
        width: "90%",
        height: "100%",
        spacing: 2,
      }}
    >
      <CssBaseline />
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="stretch"
      >
        <Grid item xs={8}>
          <Details profile={profile} />
          {/* {profile && <Details profile={profile} />} */}
        </Grid>
        <Grid item xs={4}>
          <>
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical outlined button group"
              sx={{ margin: "4px" }}
            >
              <FormControl>
                <FormLabel id="payment-plan-radio-buttons-group-form-label">
                  <Typography variant="h6">Payment Plan</Typography>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="payment-plan-radio-buttons-group-label"
                  name="payment-plan-radio-buttons-group"
                  value={
                    profile?.subscription_status
                      ? profile.subscription_status
                      : null
                  }
                  onChange={handlePaymentPlanChange}
                >
                  <FormControlLabel
                    value="S"
                    control={<Radio />}
                    label="subscription"
                  />
                  <FormControlLabel
                    value="P"
                    control={<Radio />}
                    label="pay-on-demand"
                  />
                </RadioGroup>
              </FormControl>

              <CustomButton
                text="Edit card details"
                onClick={handleEditCardDetails}
                size="large"
              />

              <CustomButton
                text="Edit Personal Details"
                onClick={handleOpen}
                size="large"
              />
            </ButtonGroup>
          </>
        </Grid>
        <Grid item xs={12}>
          <ManageVehicle />
        </Grid>
      </Grid>

      <Dialog
        component="form"
        noValidate
        onSubmit={handleSubmit}
        open={detailsOpen}
        onClose={handleClose}
      >
        <DialogTitle>Change Details</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={1}
            alignItems="right"
            justifyContent="right"
            sx={{
              padding: 2,
              maxWidth: "400px",
            }}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="first-name"
                name="first-name"
                label="First name"
                defaultValue={profile?.user.first_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="last-name"
                name="last-name"
                label="Last name"
                defaultValue={profile?.user.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email-address"
                name="email-address"
                label="Email"
                defaultValue={profile?.user.email}
              />
            </Grid>
            {/* Dialog Buttons */}
            <DialogActions>
              <Grid item xs={6}>
                <CustomButton
                  text="cancel"
                  onClick={handleClose}
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
                <CustomButton text="Submit" size="small" type="submit" />
              </Grid>
            </DialogActions>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CustomerProfile;
