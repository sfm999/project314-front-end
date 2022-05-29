import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { FixedSizeList } from "react-window";
import { deepOrange, grey } from "@mui/material/colors";
import { useState, useEffect } from "react";
import ContractorRequestDetails from "./ContractorRequestDetails";
import Button from '@mui/material/Button';

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
  const [coordsValues, setCoords] = useState(ContractorCoords);
  const [requests, setRequests] = useState(requestList);
  const [visibleRequests, setVisibleRequests] = useState([]);

  const [acceptedRequest, setAcceptedRequest] = useState();
  const [existingCurrentRequest, setExistingCurrentRequest] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(1);

  const [requestVisible, setRequestVisible] = useState(false)

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
    console.log(index)
    setSelectedIndex(index);
  }

  const setActiveRequest = (event, index) => {
    console.log("SENT",index);
    setAcceptedRequest(index);
    console.log("Accepted Request", acceptedRequest);
    setExistingCurrentRequest(true);
  }

  function filterRequests() {
    let requestsArray = [];
    let newArray;

    requestList.map((requests) => {});
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) getLocation();

    setVisibleRequests(filterRequests());

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography>
          List of Requests
        </Typography>
        <React.Fragment>
          <List>
            {requestList &&
              requestList.map((requests, index) => {
                return (
                  <ListItem button onClick={(event) => openRequestDetails(event, index)}  key={index}>
                    <ListItemText
                      key={index}
                      primary={requests.name}
                      secondary={
                        <Typography>
                          {compareLocation(requests.longitude, requests.latitude)} km
                        </Typography>
                      }
                    />
                  </ListItem>
                );
              })}
          </List>
        </React.Fragment>
      </Grid>
      <Grid item>
        <Typography>
          Request Details
        </Typography>
        { requestVisible && <ContractorRequestDetails 
          requests={requestList[selectedIndex]}/>}
        { requestVisible && 
        <Button onClick = {(event) => setActiveRequest(event, requestList[selectedIndex])}>
          Submit
        </Button>}

      </Grid>
      <Grid item>
        <Typography>
          Current Request
        </Typography>
        { existingCurrentRequest ? (
          <List>
            <ListItem>
              <ListItemText primary="Name: "
                secondary={acceptedRequest.name}/>
            </ListItem>
          </List>) : "No active requests"}
        
      </Grid>
    </Grid>
  );
}
