import React, { useCallback, useEffect, useState } from "react";

import {
  ButtonGroup,
  Container,
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
    const ID = window.localStorage.getItem("userID");
    await axios.get(`users/client/?user=${ID}`).then((response) => {
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

  const handlePaymentPlanChange = async (event) => {
    setValue(event.target.value);
    console.log(event.target.value);

    await axios
      .put(`users/client/${profile.id}/`, {
        subscription_status: event.target.value === "subscription" ? "S" : "P",
      })
      .then((response) => {
        fetchData();
      });
  };

  const handleClick = () => {};

  /* @KAINE | Put code here to submit changes to api for personal details */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // data: [first-name, last-name]

    setDetailsOpen(false);
  };

  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleOpen = () => setDetailsOpen(true);
  const handleClose = () => setDetailsOpen(false);

  // Idk why I have to reverse the ternary options but it is what makes it work ='(
  const [value, setValue] = useState(
    profile?.subscription_status ? "pay-on-demand" : "subscription"
  );

  return (
    <Container maxWidth="100%" sx={{ width: "90%", paddingTop: "20px" }}>
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
                  value={value}
                  onChange={handlePaymentPlanChange}
                >
                  <FormControlLabel
                    value="subscription"
                    control={<Radio />}
                    label="subscription"
                  />
                  <FormControlLabel
                    value="pay-on-demand"
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
            justifyContent="space-evenly"
            alignItems="center"
            sx={{
              maxWidth: "200px",
            }}
          >
            <Grid item xs={12}>
              <Typography type="subtitle">
                <strong>Current name:</strong> {profile?.user.first_name}{" "}
                {profile?.user.last_name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField id="first-name" name="first-name" label="First name" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="last-name" name="last-name" label="Last name" />
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
    </Container>
  );
}

export default CustomerProfile;
