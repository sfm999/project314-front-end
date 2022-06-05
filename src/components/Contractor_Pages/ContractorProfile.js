import { useCallback, useState } from "react";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ContractorDetails from "./ContractorDetails";

import useAuth from "../../hooks/useAuth";
import useIsMountedRef from "../../hooks/useIsMountedRef";

import axios from "../../utils/axios";
import BankDetailsForm from "./BankDetailsForm";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ContractorAccountDetails from "./ContractorAccountDetails";
import CustomButton from "../sub-components/CustomButton";

export default function ContractorProfile() {
  const isMountedRef = useIsMountedRef();

  // gets user id and allows for logout
  const { userID, logout } = useAuth();

  //holds all the profile details
  const [profile, setProfile] = useState();


  //fetches the user details from the django back end and adds it to the profile useState
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

  //Submits the bank details
  const handleBankSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // console.log("Account number:", data.get("accountNumber"));
    // console.log("BSB:", data.get("BSB"));

    await axios.patch(`users/contractor/${profile.id}/`, {'account': data.get("accountNumber"), 'BSB': data.get("BSB")}).then((response) => {
      fetchData();
    });

    handleBankDetailsClose(); //closes the bank details
  };

  const handleBankDetailsClose = () => {
    setBankDetailsOpen(false);
  }; //closes the bank details

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); 
  //use state for the delete account dialog, false = closed, true = open


  //updates the user name 
  const updateUserName = async (firstName, lastName, email) => {
    await axios.patch(`users/${userID}/`, {'first_name': firstName, 'last_name': lastName, email}).then((response) => {
      fetchData();
    });
  }


  //deletes the current account
  const handleDelete = async() => {
    await axios.delete(`users/${userID}/`).then((response) => {
      setDeleteDialogOpen(false);
      logout()
    });

  }; 

  return (
    <Container
      sx={{
        marginTop: "2%",
      }}
    >
      <Grid
        container
        justifyContent="right"
        spacing={2}
        sx={{ marginTop: "7px" }}
      >
        <Grid item xs={8}>
          {/* the user profile gets displayed here */}
          {profile && <ContractorDetails profile={profile} />}
        </Grid>
        <Grid item xs={4}>
          {/* The user account details displayed here */}
          <ContractorAccountDetails profile={profile} />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            onClick={() => setBankDetailsOpen(true)}
            size="large"
            fullWidth
          >
            {" "}
            Manage Bank Details
          </Button>
        </Grid>

        <Grid item xs={12} sx={{ mt: -1, mb: -1 }} />

        <Grid item xs={4}>
          <Button
            onClick={() => setDeleteDialogOpen(true)}
            variant="contained"
            color="error"
            size="large"
            fullWidth
          >
            Deactivate Account
          </Button>
        </Grid>
        {/*bank account details form*/}
        <BankDetailsForm
          bankDetailsOpen={bankDetailsOpen}
          handleBankSubmit={handleBankSubmit}
          handleClose={handleBankDetailsClose}
        />
      </Grid>

      {/*the dialog for deleting a contractor account */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(true)}>
        <DialogTitle color="error">WARNING</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Are you sure you want to <strong>deactivate</strong> your
                account? This action is <strong>permanent</strong>.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <CustomButton
                text="cancel"
                onClick={() => setDeleteDialogOpen(false)}
                size="large"
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                size="large"
                fullWidth
              >
                Deactivate Account
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
