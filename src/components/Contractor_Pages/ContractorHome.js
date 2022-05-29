import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import { FixedSizeList } from "react-window";
import { deepOrange, grey } from "@mui/material/colors";
import { useState, useEffect } from "react";
import ContractorRequestDetails from "./ContractorRequestDetails";
import Button from "@mui/material/Button";

import axios from "../../utils/axios";
import { DataGrid } from "@mui/x-data-grid";
import useAuth from "../../hooks/useAuth";

const ContractorCoords = {
  longitude: null,
  latitude: null,
};

const requestInformationDefault = [
  {
    customerName: "",
    issue: "",
    vehicleModel: "",
    vehicleManufacturer: "",
    vehicleColor: "",
    registration: "",
  },
];

const requestList = [
  {
    ID: 1,
    name: "Jeffry Jack",
    longitude: 150.89583,
    latitude: -34.39667,
  },
  {
    ID: 2,
    name: "Elon Musk",
    longitude: 150.8499966,
    latitude: -34.4333316,
  },
  {
    ID: 3,
    name: "Billy Joel",
    longitude: 150.88582979,
    latitude: -34.483998064,
  },
];

const listButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: deepOrange[500],
  "&:hover": {
    backgroundColor: deepOrange[700],
  },
}));

export default function ContractorHome() {
  const { userID } = useAuth();
  const [coordsValues, setCoords] = useState(ContractorCoords);
  const [unassignedRequests, setUnassignedRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [myCompletedRequests, setMyCompletedRequests] = useState([]);

  const [acceptedRequest, setAcceptedRequest] = useState();
  const [existingCurrentRequest, setExistingCurrentRequest] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(1);

  const [requestVisible, setRequestVisible] = useState(false);

  const [unassignedSelection, setUnassignedSelection] = useState();
  const [inProgressSelection, setInProgressSelection] = useState();

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
    apiMarkCompleted(inProgressSelection[0]);
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
            <Button onClick={markCompleted} variant="contained">
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
    </Grid>
    // <Grid container spacing={2}>
    //   <Grid item>
    //     <Typography>List of Requests</Typography>
    //     <React.Fragment>
    //       <List>
    //         {requestList &&
    //           requestList.map((requests, index) => {
    //             return (
    //               <ListItem
    //                 button
    //                 onClick={(event) => openRequestDetails(event, index)}
    //                 key={index}
    //               >
    //                 <ListItemText
    //                   key={index}
    //                   primary={requests.name}
    //                   secondary={
    //                     <Typography>
    //                       {compareLocation(
    //                         requests.longitude,
    //                         requests.latitude
    //                       )}{" "}
    //                       km
    //                     </Typography>
    //                   }
    //                 />
    //               </ListItem>
    //             );
    //           })}
    //       </List>
    //     </React.Fragment>
    //   </Grid>
    //   <Grid item>
    //     <Typography>Request Details</Typography>
    //     {requestVisible && (
    //       <ContractorRequestDetails requests={requestList[selectedIndex]} />
    //     )}
    //     {requestVisible && (
    //       <Button
    //         onClick={(event) =>
    //           setActiveRequest(event, requestList[selectedIndex])
    //         }
    //       >
    //         Submit
    //       </Button>
    //     )}
    //   </Grid>
    //   <Grid item>
    //     <Typography>Current Request</Typography>
    //     {existingCurrentRequest ? (
    //       <List>
    //         <ListItem>
    //           <ListItemText primary="Name: " secondary={acceptedRequest.name} />
    //         </ListItem>
    //       </List>
    //     ) : (
    //       "No active requests"
    //     )}
    //   </Grid>
    // </Grid>
  );
}
