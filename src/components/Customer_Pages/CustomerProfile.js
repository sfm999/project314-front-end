import { useCallback, useEffect, useState } from "react";

import { Button, Container, Grid } from "@mui/material";
import React from "react";
import Details from "./Details";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import ManageVehicle from "./ManageVehicle";

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
        <Grid item xs={4}>
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="outlined"
            sx={{
              color: "black",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                border: "none",
              },
              mb: 2,
            }}
            onClick={handlePaymentPlanClick}
          >
            Payment Plan
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ManageVehicle />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CustomerProfile;
