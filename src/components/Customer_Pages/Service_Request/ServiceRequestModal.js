
import { useCallback, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { List, ListItem, ListItemText, ListItemAvatar, Typography, Card, Grid } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DoneIcon from '@mui/icons-material/Done';
import ListItemTextContainer from "../../sub-components/ListItemTextContainer";
import TextField from '@mui/material/TextField';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const locationValues = {
    longitude: null,
    latitude: null
};

const requestValues = {
    name: "",
    registration: "",
    longitude: "",
    latitude: "",
}



const ServiceRequestModal = ({profile, vehicle, sendDataToHomePage }) => {
    const [clicked, setClicked] = useState(false);
    const [locationDenied, setDenied] = useState();
    const [location, setLocation] = useState(locationValues);

    /*Probably dont even need a usestate, maybe just return the values to the CustomerHomePage */
    const [request, setRequest] = useState(requestValues);

    function submitRequest() {
        console.log("From profile",profile.first_name);
        console.log("From vehicle", vehicle.vehicleRegistration);
        console.log("From location",location.longitude);
        console.log("From location",location.latitude);
        setRequest(request => ({
            ...request,
            name: profile.first_name,
            registration: vehicle.vehicleRegistration,
            longitude: location.longitude,
            latitude: location.latitude
        })
    );
        sendDataToHomePage(request);
    }

    function getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLocation({
                    longitude: position.coords.longitude, 
                    latitude: position.coords.latitude});
                console.log(
                    location.longitude,
                    location.latitude
                );
                setClicked(!clicked);
                setDenied(false);
            }, (err) => {
                console.log(err);
                setDenied(true);
            }
            );
        };
    return (
        <Box sx={style}>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <PersonIcon/>
                    </ListItemAvatar>
                    <ListItemTextContainer 
                        primaryText="Customer" secondaryText={profile.first_name + " " + profile.last_name} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <ReceiptLongIcon/>
                    </ListItemAvatar>
                    {/*This will have a dropdown menu that includes all the vehicles
                        that are owned by that customer
                        if the customer has no added vehicles, have something that 
                        asks ADD A VEHICLE NOW! */}
                    <ListItemTextContainer 
                    primaryText = "Vehicle Registration" secondaryText={vehicle.vehicleRegistration}/>
                </ListItem>
                {/* The Cars Issue Description */}
                <ListItem>
                    <ListItemAvatar>
                        <CarCrashIcon/>
                    </ListItemAvatar>
                    <TextField
                        margin="normal"
                        multiline
                        maxRows= {4}
                        name="issue-description"
                        label="Issue Description"
                        type="issue-description"
                        id="issue-description"
                    />
                    
                </ListItem>
                <ListItem>
                    <Button 
                        onClick = {getLocation}
                    >
                        {clicked ?  <MyLocationIcon/> :<LocationSearchingIcon/>}
                    </Button>
                    <Typography>
                        {locationDenied ? "Allow access to location services" : ""} {/* if location is denied */}
                        {clicked && !locationDenied ? <DoneIcon/> : ""} {/*if location is not denied and it is clicked show done */}
                    </Typography>
                </ListItem>
            </List>
            {/*Submits the request */}
            <Button
                onClick= {submitRequest}
            >Submit</Button>
        </Box>

    )
}

export default ServiceRequestModal;