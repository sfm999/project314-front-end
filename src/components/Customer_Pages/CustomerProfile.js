import { useCallback, useEffect, useState } from "react";

import { Button, ButtonGroup, Container, Grid } from "@mui/material";
import React from "react";
import Details from "./Details";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import ManageVehicle from "./ManageVehicle";
import CustomButton from "../sub-components/CustomButton";

export function CustomerProfile() {
  const isMountedRef = useIsMountedRef();

  const { userID } = useAuth();
  const [profile, setProfile] = useState();

  // Handle changing url with router v6 useNavigate insted of useHistory
  let navigate = useNavigate();

  const handleVehicleClick = () => {
    let path = "/customer/vehicles/manage";
    navigate(path);
  };

  const handlePaymentPlanClick = () => {
    let path = "/customer/payment";
    navigate(path);
  };

  const fetchData = useCallback(async () => {
    const ID = window.localStorage.getItem("userID");
    await axios.get(`users/client/?user=${ID}`).then((response) => {
      console.log(response.data[0]);
      setProfile(response.data[0]);
    });
  }, []);

  const handleEditCardDetails = () => {};

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <Grid item xs={3}>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            <CustomButton
              text="Payment Plan"
              onClick={handlePaymentPlanClick}
              size="large"
            />

            <CustomButton
              text="Change plan"
              onClick={handleEditCardDetails}
              size="large"
            />

            <CustomButton
              text="Edit payment details"
              onClick={handleEditCardDetails}
              size="large"
            />

            <CustomButton
              text="Edit Billing Details"
              onClick={handleEditCardDetails}
              size="large"
            />
          </ButtonGroup>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={12}>
          <ManageVehicle />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CustomerProfile;
