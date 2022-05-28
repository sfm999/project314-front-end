import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { deepOrange, grey } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import RequestList from './RequestsList';



/*
    THIS SHOWS ALL THE REQUESTS NEAR THE CONTRACTOR
    AND WHEN YOU CLICK THE REQUEST INSIDE THE LIST
    ALL THE DETAILS OPEN IN A BOX TO THE RIGHT
*/

const ContractorCoords = {
    longitude: null,
    latitude: null,
}



const requestInformationDefault = [
    {
        customerName: "",
        issue: "",
        vehicleModel: "",
        vehicleManufacturer: "",
        vehicleColor: "",
        registration: ""
    }
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
  }

];



const listButton = styled(ListItemButton) (({ theme }) => ({
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
        backgroundColor: deepOrange[700],
    },
}));

function RenderList(props) {
    const {index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton key="ItemButton"
                sx={{
                    '&:hover, &:focus': {
                        bgcolor: grey[500],
                    },
                }}

            //onclick open more details
            //also change background color on click
            >
                <ListItemText primary={`Item ${index + 1}`}/>
            </ListItemButton>
        </ListItem>
    );

}


export default function ContractorHome() {

    const [coordsValues, setCoords] = useState(ContractorCoords);
    const [requests, setRequests] = useState(requestList);
    const [visibleRequests, setVisibleRequests] = useState([]);




    function compareLocation(longitude, latitude) {

      var currentLongitude = (coordsValues.longitude * Math.PI / 180);
      var currentLatitude = (coordsValues.latitude * Math.PI / 180);

      var requestLongitude = (longitude * Math.PI / 180);
      var requestLatitude = (latitude * Math.PI / 180);

      if (requestLongitude > currentLongitude)
            var longitudeDistance = requestLongitude - currentLongitude;
        else if (requestLongitude < currentLongitude)
            var longitudeDistance = currentLongitude - requestLongitude;


        if (requestLatitude > currentLatitude)
            var latitudeDistance = requestLatitude - currentLatitude;
        else if (requestLatitude < currentLatitude)
            var latitudeDistance = currentLatitude - requestLatitude;
        

        //if currentLatitude - unswLatitude
        var a = Math.pow(Math.sin(latitudeDistance / 2), 2)
                        + Math.cos(requestLatitude) * Math.cos(currentLatitude)
                        * Math.pow(Math.sin(longitudeDistance / 2), 2);
        var b = 2 * Math.asin(Math.sqrt(a));

        var r = 6371 //radius of the earth;

        var totalDistance = b * r;

        console.log("Distance is : ", b * r, "km");

        if (totalDistance < 50) {
          return Math.round(totalDistance*100)/100;
        }
        else {
          return 0;
        }

        
    }

    function getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                setCoords({
                    longitude: position.coords.longitude, 
                    latitude: position.coords.latitude});
                console.log(
                    coordsValues,
                );
            });
    }

    function filterRequests() {
      let requestsArray = [];
      let newArray;

      requestList.map((requests) => {
        requests.map()
      })
    }

    useEffect(() => {
        let ignore = false;
        if (!ignore) getLocation()

        setVisibleRequests(filterRequests());

        
        return() => {ignore = true;}
    }, []);

    return (
        <Grid container spacing = {2}>
            <Grid item xs={12} md={6}>
                <Typography variant='h6'>Service Requests</Typography>
                <FixedSizeList
                    height={400}
                    width={360}
                    itemSize={46}
                    itemCount={requests.length} //this will be the amount of requests
                    overscanCount={5}
                >
                    {RenderList}
                </FixedSizeList>
                {/*
                    This will have the extra details about the vehicle that
                    needs to be serviced
                    will include 
                    1. Vehicle model
                    2. Customer name
                    3. Location
                 */}
            </Grid>

            <React.Fragment>
              <List>
                    {requestList &&
                      requestList.map((requests) => {
                        return (
                          <ListItem button key={requests.ID}>
                            <ListItemText key={requests.ID} 
                              primary={requests.name} 
                              secondary={<Typography>{compareLocation(requests.longitude, requests.latitude)}</Typography>}/>
                          </ListItem>
                        );
                      })}
                </List>
              </React.Fragment>
            {/*<Grid item xs={12} md={6}>
                <Typography variant='h6'>Request Details</Typography>
                
                    This will have the list of the vehicles that need 
                    servicing withing 50km of the contractor
                    will include
                    1. Vehicle model
                    2. Vehicle manufacturer
                    2. Vehicle colour
                    3. Customer name
                    4. Any other details
                <Typography>
                    longitude: {coordsValues.longitude} and latitude: {coordsValues.latitude}
                </Typography>
            </Grid>*/}
        </Grid>
    )
}