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
import BankDetailsForm from "./BankDetailsForm";
import CustomButton from "../sub-components/CustomButton";
import { Card, Container } from "@mui/material";
import ContractorAccountDetails from "./ContractorAccountDetails";

export default function ContractorProfile() {
  const isMountedRef = useIsMountedRef();

  const { userID } = useAuth();

  const [profile, setProfile] = useState();

  const fetchData = useCallback(async () => {
    await axios.get(`users/contractor/?user=${userID}`).then((response) => {
      console.log(response.data);
      setProfile(response.data[0]);
    });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [bankDetailsOpen, setBankDetailsOpen] = useState(false);

  // @KAINE | TODO, implement API call to update bank details
  const handleBankSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log("Account number:", data.get("accountNumber"));
    console.log("BSB:", data.get("BSB"));

    handleBankDetailsClose();
  };

  const handleBankDetailsClose = () => {
    setBankDetailsOpen(false);
  };

  return (
    <Container
      sx={{
        marginTop: "2%",
      }}
    >

        <Grid container justifyContent="right" spacing={2} sx={{ marginTop: "7px" }}>
        <Grid item xs={8}>
          {profile && <ContractorDetails profile={profile} />}
        </Grid>
          <Grid item xs={4}>
            <ContractorAccountDetails profile={profile} />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              onClick={() => setBankDetailsOpen(true)}
              size="large"
              fullWidth
            > Manage Bank Details
              </Button>
          </Grid>

          <Grid item xs={12} sx={{mt: -1, mb: -1}} />

          <Grid item xs={4}>
            <Button variant="contained" color="error" size="large" fullWidth>
              Delete Account
            </Button>
          </Grid>
        <BankDetailsForm
          bankDetailsOpen={bankDetailsOpen}
          handleBankSubmit={handleBankSubmit}
          handleClose={handleBankDetailsClose}
        />
      </Grid>
    </Container>
  );
}
