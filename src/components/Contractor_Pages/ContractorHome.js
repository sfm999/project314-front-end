import * as React from "react";
import Grid from "@mui/material/Grid";
import { Stack, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "../../utils/axios";
import { DataGrid } from "@mui/x-data-grid";
import useAuth from "../../hooks/useAuth";

const ContractorCoords = {
  longitude: null,
  latitude: null,
};

const issues = [
  {
    issueName: "Select an issue",
    issueCost: "",
  },
  {
    issueName: "Replacement Battery",
    issueCost: "$100-$450",
  },
  {
    issueName: "Oil change",
    issueCost: "$65-$125",
  },
  {
    issueName: "Replaced Brake Fluid",
    issueCost: "$70-$120",
  },
  {
    issueName: "Vehicle Towed",
    issueCost: "$150-$400",
  },
  {
    issueName: "Busted start motor",
    issueCost: "$150-$1100",
  },
  {
    issueName: "Control valve issues",
    issueCost: "$70-$400",
  },
  {
    issueName: "Spark Plug Replacement",
    issueCost: "$120-$250",
  },
  {
    issueName: "Engine overheated",
    issueCost: "$100-$1500",
  },
  {
    issueName: "Alternator failure",
    issueCost: "$400-$900",
  },
  {
    issueName: "Unlocked car",
    issueCost: "$30-$50",
  },
  {
    issueName: "Replacement Key",
    issueCost: "$250",
  },
];

export default function ContractorHome() {
  const { userID } = useAuth();
  const [coordsValues, setCoords] = useState(ContractorCoords);
  const [unassignedRequests, setUnassignedRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [myCompletedRequests, setMyCompletedRequests] = useState([]);

  const [acceptedRequest, setAcceptedRequest] = useState();
  const [existingCurrentRequest, setExistingCurrentRequest] = useState(false);

  //es-lint
  const [selectedIndex, setSelectedIndex] = useState(1);

  const [requestVisible, setRequestVisible] = useState(false);

  const [unassignedSelection, setUnassignedSelection] = useState();
  const [inProgressSelection, setInProgressSelection] = useState();

  const [completedRequestOpen, setCompletedRequestOpen] = useState(false);

  const openCompletedRequest = () => setCompletedRequestOpen(true);
  const closeCompletedRequest = () => setCompletedRequestOpen(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(1);

  const open = Boolean(anchorEl);

  const handleListSelect = (event, index) => {
    setSelectedIssue(index);
    setAnchorEl(null);
  };

  const handleListClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleListClose = () => {
    setAnchorEl(null);
  };

  function compareLocation(longitude, latitude) {
    var currentLongitude = (coordsValues.longitude * Math.PI) / 180;
    var currentLatitude = (coordsValues.latitude * Math.PI) / 180;

    var requestLongitude = (longitude * Math.PI) / 180;
    var requestLatitude = (latitude * Math.PI) / 180;

    if (requestLongitude > currentLongitude)
      var longitudeDistance = requestLongitude - currentLongitude;
    else if (requestLongitude < currentLongitude)
      var longitudeDistance = currentLongitude - requestLongitude;

    if (requestLatitude > currentLatitude)
      var latitudeDistance = requestLatitude - currentLatitude;
    else if (requestLatitude < currentLatitude)
      var latitudeDistance = currentLatitude - requestLatitude;

    //if currentLatitude - unswLatitude
    var a =
      Math.pow(Math.sin(latitudeDistance / 2), 2) +
      Math.cos(requestLatitude) *
        Math.cos(currentLatitude) *
        Math.pow(Math.sin(longitudeDistance / 2), 2);
    var b = 2 * Math.asin(Math.sqrt(a));

    var r = 6371; //radius of the earth;

    var totalDistance = b * r;

    console.log("Distance is : ", b * r, "km");

    if (totalDistance < 50) {
      return Math.round(totalDistance * 100) / 100;
    } else {
      return 0;
    }
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
      console.log(coordsValues);
    });
  }

  const openRequestDetails = (event, index) => {
    setRequestVisible(!requestVisible);
    console.log(index);
    setSelectedIndex(index);
  };

  const setActiveRequest = (event, index) => {
    console.log("SENT", index);
    setAcceptedRequest(index);
    console.log("Accepted Request", acceptedRequest);
    setExistingCurrentRequest(true);
  };

  const fetchUnassignedRequests = async () => {
    axios.get(`users/requests/unassigned`).then((response) => {
      console.log("REQUESTS", response.data);
      setUnassignedRequests(response.data);
    });
  };

  const fetchMyRequests = async () => {
    axios
      .get(`users/requests/?contractor=${userID}&status=I`)
      .then((response) => {
        console.log("REQUESTS", response.data);
        setMyRequests(response.data);
      });
  };

  const fetchMyCompletedRequests = async () => {
    axios
      .get(`users/requests/?contractor=${userID}&status=C`)
      .then((response) => {
        console.log("REQUESTS", response.data);
        setMyCompletedRequests(response.data);
      });
  };

  const apiAssignRequest = async (id) => {
    axios
      .put(`users/requests/${id}/`, { contractor: userID })
      .then((response) => {
        console.log(response.data);
        console.log("Assigned request.");

        fetchUnassignedRequests();
        fetchMyRequests();
      });
  };

  const apiMarkCompleted = async (id) => {
    axios.put(`users/requests/${id}/`, { status: "C" }).then((response) => {
      fetchUnassignedRequests();
      fetchMyRequests();
      fetchMyCompletedRequests();
    });
  };

  const assignRequests = async () => {
    console.log(unassignedSelection);

    apiAssignRequest(unassignedSelection[0]);
  };

  const markCompleted = async () => {
    //just use the array of issues with the selectedIssue index :)
    console.log(
      issues[selectedIssue].issueName + " " + issues[selectedIssue].issueCost
    );

    apiMarkCompleted(inProgressSelection[0]);
    //also open up a dialog window that provides a list of issues
    //and gets an estimated cost from said list
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) getLocation();

    fetchUnassignedRequests();
    fetchMyRequests();
    fetchMyCompletedRequests();

    return () => {
      ignore = true;
    };
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      maxWidth: 60,
      flex: 1,
      valueGetter: (params) => {
        return params.row.instrument
          ? params.row.instrument?.id
          : params.row?.id;
      },
    },
    {
      field: "first_name",
      headerName: "First Name",
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => {
        return params.row.client.first_name;
      },
    },
    {
      field: "last_name",
      headerName: "Last Name",
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => {
        return params.row.client.last_name;
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
      type: "date",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        return params.row.vehicle.rego;
      },
    },
    {
      field: "issue",
      headerName: "Issue",
      type: "date",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => {
        return params.row.description;
      },
    },
  ];

  return (
    <Grid container>
      <Grid item xs={6}>
        <Stack direction="column" sx={{ m: 6 }} spacing={2}>
          <Typography variant="h6">Unassigned Requests</Typography>

          <div style={{ height: 300 }}>
            <DataGrid
              columns={columns}
              rows={unassignedRequests}
              onSelectionModelChange={(ids) => {
                setUnassignedSelection(ids);
              }}
            />
          </div>
          <Stack direction="row">
            <Button onClick={assignRequests} variant="contained">
              Accept Request
            </Button>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <Stack direction="column" sx={{ m: 6 }} spacing={2}>
          <Typography variant="h6">Requests In-Progress</Typography>

          <div style={{ height: 300 }}>
            <DataGrid
              columns={columns}
              rows={myRequests}
              onSelectionModelChange={(ids) => {
                setInProgressSelection(ids);
              }}
            />
          </div>
          <Stack direction="row">
            {/* <Button onClick={markCompleted} variant="contained"> */}
            <Button onClick={openCompletedRequest} variant="contained">
              Mark Completed
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="column" sx={{ m: 6 }} spacing={2}>
          <Typography variant="h6">Request History</Typography>

          <div style={{ height: 300 }}>
            <DataGrid columns={columns} rows={myCompletedRequests} />
          </div>
        </Stack>
      </Grid>
      <Dialog
        component="form"
        noValidate
        onSubmit={markCompleted}
        open={completedRequestOpen}
        onClose={closeCompletedRequest}
      >
        <DialogContent>
          <DialogContentText variant="h5">
            Please enter some details about the service
          </DialogContentText>
          {/*Also put in the actual request details in somewhere*/}
          <Grid container>
            <Grid item>
              <List>
                <ListItem
                  button
                  id="lock-button"
                  area-haspopup="listbox"
                  area-controls="lock-menu"
                  area-label="when device is locked"
                  area-expanded={open ? "true" : undefined}
                  onClick={handleListClick}
                >
                  <ListItemText>Car Issue</ListItemText>
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleListClose}
                menulistprops={{
                  "area-labelledby": "lock-button",
                  role: "listbox",
                }}
              >
                {issues.map((issue, index) => (
                  <MenuItem
                    key={index}
                    disabled={index === 0}
                    selected={index === selectedIssue}
                    onClick={(event) => handleListSelect(event, index)}
                  >
                    {issue.issueName + " - $" + issue.issueCost}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
            <Grid item>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography>
                        Cost of {issues[selectedIssue].issueName}
                      </Typography>
                    }
                    secondary={issues[selectedIssue].issueCost}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCompletedRequest}>Cancel</Button>

          <Button type="submit">Mark as Completed</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
