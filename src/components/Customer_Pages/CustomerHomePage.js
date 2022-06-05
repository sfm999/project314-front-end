import React, { useCallback, useEffect, useState } from "react"; //Added by Ethan for modal stuff
import {
  Button,
  Card,
  CssBaseline,
  Grid,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Stack,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import ServiceRequest from "./Service_Request/ServiceRequest";
import axios from "../../utils/axios"; //Added by Ethan for the Modal stuff
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  LocationSearchingIcon,
  MyLocationIcon,
  DoneIcon,
} from "./Service_Request";

import useAuth from "../../hooks/useAuth";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { DataGrid } from "@mui/x-data-grid";

import CustomButton from "../sub-components/CustomButton";

// Custom item used in creating interface with pre-existing css
const Item = styled(Card)(({ theme }) => ({
  display: "relative",
  textAlign: "center",
}));

// Default Request Values
const requestValues = {
  name: "",
  registration: "",
  longitude: "",
  latitude: "",
};

// Default Location Values
const locationValues = {
  longitude: null,
  latitude: null,
};

// Default Vehicle list and default values
const defaultVehicleList = [
  {
    rego: "",
    make: "",
    model: "",
    colour: "",
    year: "",
    user: "",
  },
];

const CustomerHomePage = () => {
  // Holds the profile containing customer's relevant info
  const [profile, setProfile] = useState();

  // Holds the request and initially populated with default request values
  const [request, setRequest] = useState(requestValues);

  // Used for determining displaying confirmation of location button clicked
  const [clicked, setClicked] = useState(false);

  // Holds status of location services being allowed or blocked by customer
  const [locationDenied, setDenied] = useState();

  // Store the actual location
  const [location, setLocation] = useState(locationValues);

  // Contains the list of requests made by the customer
  const [requests, setRequests] = useState([]);
  // Contains the list of previous requests made by the customer
  const [requestHistory, setRequestHistory] = useState([]);

  // Grab the userID from the useAuth() hook
  const { userID } = useAuth();
  // Stores the vehicles for the customer, populated with default vehicle list value(s)
  const [vehicleList, setVehicleList] = useState(defaultVehicleList);

  // Boolean for determining if service dialog window is to be displayed or not
  const [serviceOpen, setServiceOpen] = useState(false);

  // MUI menu's take anchor elements. This will store the anchor element for use in a Mui Menu
  const [anchorEl, setAnchorEl] = useState(null);

  // This is used in the displaying of the vehicle list for creating a service request
  // 0 acts as a sentinel/placeholder value for interacting with the list
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Determines if an anchor element
  const open = Boolean(anchorEl);

  // Open and Close methods for the service dialog window
  const handleOpen = () => setServiceOpen(true);
  const handleClose = () => setServiceOpen(false);

  function getLocation() {
    // Get the current location from web browser
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Set the location in the state we declared for this purpose
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        // Reverse 'clicked' value
        setClicked(!clicked);
        // We got the location, so setDenied = false
        setDenied(false);
      },
      // Catch a customer's declining of the location request
      (err) => {
        console.log(err);
        setDenied(true);
      }
    );
  }

  // Set the anchor element to the selected vehicle
  const handleVehicleSelect = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Sets selected index to vehicle clicked, then resets anchor element to null
  const handleItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  // Set anchor element to null on menu close as menu is collapsed
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Grab the vehicles, registered to the customer (userID), from the API
  const fetchVehicles = async () => {
    axios.get(`users/vehicles/?user=${userID}`).then((response) => {
      setVehicleList(response.data);
    });
  };

  // Grab the service requests, registered to the customer (userID),
  // as well as being in progress from the API
  const fetchRequests = async () => {
    console.log("FETCH REQUESTS");
    axios.get(`users/requests/?client=${userID}&status=I`).then((response) => {
      setRequests(response.data);
    });
  };

  // Fetch the history of requests that have been both submitted by the customer,
  // as well as being marked with a status of 'C' for 'complete'.
  const fetchRequestHistory = async () => {
    axios.get(`users/requests/?client=${userID}&status=C`).then((response) => {
      setRequestHistory(response.data);
    });
  };

  // Grab the user's information from the API
  // to then populate the 'profile' for the customer
  const fetchData = useCallback(async () => {
    await axios.get(`users/${userID}`).then((response) => {
      setProfile(response.data);
    });
  }, []);

  // Load the customer data for vehicles, requests in progress, and previous requests.
  // Reruns every time the fetchData function is run, avoids infinite loop as fetchData uses useCallback()
  useEffect(() => {
    fetchData();
    fetchVehicles();
    fetchRequests();
    fetchRequestHistory();
  }, [fetchData]);

  const handleSubmit = async (event) => {
    // Don't refresh
    event.preventDefault();
    // Get the form data
    const data = new FormData(event.currentTarget);

    // object containing data to be used in submission to API
    const submitData = {
      client: userID,
      vehicle: vehicleList[selectedIndex].id,
      description: data.get("issue"),
      location_latitude: location.latitude,
      location_longitude: location.longitude,
    };

    // Close the service dialog window
    setServiceOpen(false);

    // Make the request to the API to submit the data, then refresh the data points
    // on the page to ensure fresh data displayed
    await axios.post(`users/requests/`, submitData).then((response) => {
      console.log(response.data);
      fetchData();
      fetchVehicles();
      fetchRequests();
      fetchRequestHistory();
    });
  };

  // Columns for the data grid
  const columns = [
    {
      field: "first_name",
      headerName: "Contractor First Name",
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => {
        return params.row.contractor.first_name;
      },
    },
    {
      field: "last_name",
      headerName: "Contractor Last Name",
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => {
        return params.row.contractor.last_name;
      },
    },
    {
      field: "make",
      headerName: "Make",
      minWidth: 120,
      flex: 1,
      valueGetter: (params) => {
        return params.row.vehicle.make;
      },
    },
    {
      field: "model",
      headerName: "Model",
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.row.vehicle.model;
      },
    },
    {
      field: "rego",
      headerName: "Registration",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        return params.row.vehicle.rego;
      },
    },
    {
      field: "issue",
      headerName: "Initial Request",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        return params.row.description;
      },
    },
    {
      field: "contractor_identified_issue",
      headerName: "Issue",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "estimated_cost_range",
      headerName: "Cost Estimate",
      minWidth: 150,
      flex: 1,
    },
  ];

  // These three pieces of state are used during the cancellation process of a service request. (See more below)
  const [cancelOpen, setCancelOpen] = useState(false);
  const [contractorAllocated, setContractorAllocated] = useState(false);
  const [requestID, setRequestID] = useState("");

  // Handles setting the ID given by request, as well as contractorAllocated status.
  // Opens the dialog for cancellation request confirmation
  const handleCancel = (id, isAllocated) => {
    setRequestID(id);
    setContractorAllocated(isAllocated);
    setCancelOpen(true);
  };

  // Called upon when a request is confirmed as cancelled.
  // Will use contractorAllocated to determine if payment receipt generated (if we cbf)
  const handleCancelRequest = () => {
    handleCancelClose();
  };

  // Simple closes the cancel dialog window by setting cancelOpen variable to false
  const handleCancelClose = () => {
    setCancelOpen(false);
  };

  const handleCancelSubmit = (event) => {
    event.preventDefault();
  };

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

      <Card
        sx={{
          width: "100%",
          display: "relative",
          padding: 2,
        }}
        style={{ backgroundColor: "#f1f0f8" }}
      >
        <Stack direction="row">
          {requests.length > 0 && (
            <Typography variant="h4" sx={{ marginTop: "10px" }}>
              Requests
            </Typography>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" size="large" onClick={handleOpen}>
            Request Service
          </Button>
        </Stack>
        {/* This is where we format the requests gained from the API call */}
        <Grid container spacing={1} justifyContent="left">
          {requests.map((req) => {
            return (
              <Grid
                item
                xs={12}
                md={3}
                xl={2}
                sx={{
                  margin: "5px",
                  padding: "5px",
                }}
                key={req.id}
              >
                <Item
                  sx={{
                    maxWidth: "320px",
                    minWidth: "210px",
                  }}
                >
                  <ServiceRequest request={req} handleCancel={handleCancel} />
                </Item>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          Request History
        </Typography>
        <Box
          sx={{
            height: 300,
            "& .row-class": {
              border: { color: "black" },
            },
          }}
        >
          <DataGrid
            sx={{
              borderColor: "darkgrey",
            }}
            columns={columns}
            rows={requestHistory}
            getRowClassName={(params) => "row-class"}
          />
        </Box>
      </Card>

      {/* Service request dialog */}
      <Dialog
        component="form"
        noValidate
        onSubmit={handleSubmit}
        open={serviceOpen}
        close={handleClose}
      >
        <DialogContent>
          <DialogContentText variant="h5">Service Request</DialogContentText>
          <Grid container>
            <Grid item>
              <DialogContentText>
                Name: {profile?.first_name} {profile?.last_name}
              </DialogContentText>
              <TextField
                autoFocus
                multiline
                maxRows={4}
                margin="dense"
                name="issue"
                id="issue"
                label="Issue Description"
                type="issue"
              />
            </Grid>
            <Grid item>
              <List>
                <ListItem>
                  <Typography>get current location:</Typography>
                  <Button onClick={getLocation}>
                    {clicked ? <MyLocationIcon /> : <LocationSearchingIcon />}
                  </Button>
                  <Typography>
                    {locationDenied ? "Allow access to location services" : ""}
                    {clicked && !locationDenied ? <DoneIcon /> : ""}
                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <List>
                <ListItem
                  button
                  id="lock-button"
                  area-haspopup="listbox"
                  area-controls="lock-menu"
                  area-label="when device is locked"
                  area-expanded={open ? "true" : undefined}
                  onClick={handleVehicleSelect}
                >
                  <ListItemText
                    primary="Vehicle List"
                    secondary={
                      vehicleList[selectedIndex]?.make +
                      " " +
                      vehicleList[selectedIndex]?.model
                    }
                  />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                menulistprops={{
                  "area-labelledby": "lock-button",
                  role: "listbox",
                }}
              >
                {vehicleList.map((vehicle, index) => (
                  <MenuItem
                    key={index}
                    disabled={index === selectedIndex}
                    selected={index === selectedIndex}
                    onClick={(event) => handleItemClick(event, index)}
                  >
                    {vehicle.make + " " + vehicle.model}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          {/* TODO: This should also actually submit the request, or send the
             the customer to the payment screen :) */}
          <Button type="submit">Submit Request</Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Request dialog */}
      <Dialog
        component="form"
        noValidate
        onSubmit={handleCancelSubmit}
        open={cancelOpen}
        onClose={handleCancelClose}
      >
        <DialogTitle>Cancelling a Request</DialogTitle>

        <DialogContent>
          <Grid container justifyContent="space-evenly" alignItems="center">
            {/* No Contractor Allocated Code */}
            {!contractorAllocated && (
              <Grid item xs={12} sx={{ padding: "1.5%" }}>
                <Typography variant="body1">
                  You're about to cancel a request. As you do not have a
                  contractor at this time, you may cancel without incurring a
                  fee.
                </Typography>
              </Grid>
            )}
            {!contractorAllocated && (
              <Grid item>
                <CustomButton
                  text="abort"
                  onClick={handleCancelClose}
                  size="large"
                />
              </Grid>
            )}
            {!contractorAllocated && (
              <Grid item>
                <CustomButton
                  text="cancel request"
                  onClick={handleCancelRequest}
                  type="submit"
                  size="large"
                />
              </Grid>
            )}

            {/* Contractor Allocated Code, Cancellation fee incurred */}
            {contractorAllocated && (
              <Grid item xs={12} sx={{ padding: "1.5%" }}>
                <Typography variant="body1">
                  You're about to cancel a request. As you have a contractor who
                  has accepted your service request, you will have{" "}
                  <strong>$25</strong> fee. Do you accept?
                </Typography>
              </Grid>
            )}
            {contractorAllocated && (
              <Grid item>
                <CustomButton
                  text="abort"
                  onClick={handleCancelClose}
                  size="large"
                />
              </Grid>
            )}
            {contractorAllocated && (
              <Grid item>
                <CustomButton
                  text="accept & cancel"
                  onClick={handleCancelRequest}
                  type="submit"
                  size="large"
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CustomerHomePage;
