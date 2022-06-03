import { useCallback, useState } from "react";
import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ContractorDetails from "./ContractorDetails";

import useAuth from "../../hooks/useAuth";
import useIsMountedRef from "../../hooks/useIsMountedRef";

import axios from "../../utils/axios";
import { useNavigate } from "react-router";

export default function ContractorProfile() {
  const isMountedRef = useIsMountedRef();

  const navigate = useNavigate();

  const { userID } = useAuth();

  const [profile, setProfile] = useState();

  const fetchData = useCallback(async () => {
    const ID = window.localStorage.getItem("userID");
    await axios.get(`users/contractor/?user=${ID}`).then((response) => {
      console.log(response.data);
      setProfile(response.data[0]);
    });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditBankDetails = () => {
    const path = "/contractor/bank-details";
    navigate(path);
  };
  return (
    <Grid container spacing={2} sx={{ paddingRight: "30px" }}>
      <Grid item xs={8}>
        {profile && <ContractorDetails profile={profile} />}
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid item xs={12} md={15}>
          <Button variant="contained" onClick={handleEditBankDetails}>
            Manage Bank Details
          </Button>
          {/*This whole list can me moved to another page */}
          <List>
            <ListItem>
              <ListItemText
                primary="Account Owner"
                secondary={
                  profile?.user?.first_name + " " + profile?.user?.last_name
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="BSB" secondary={profile?.BSB} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Account Number"
                secondary={profile?.account}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="error">
            Delete Account
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
