import * as React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { deepOrange, grey } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

/*
    THIS SHOWS ALL THE REQUESTS NEAR THE CONTRACTOR
    AND WHEN YOU CLICK THE REQUEST INSIDE THE LIST
    ALL THE DETAILS OPEN IN A BOX TO THE RIGHT
*/

const ContractorCoords = {
    longitude: null,
    latitude: null,
}



const requestInformation = {
    vehicleModel: "",
    vehicleManufacturer: "",
    vehicleColor: "",
    customerName: "",
}

//have an object that holds the request info


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
            <ListItemButton
                sx={{
                    '&:hover, &:focus': {
                        bgcolor: grey[500],
                    },
                }}
                //onClick = {getDistance}

            //onclick open more details
            //also change background color on click
            >
                <ListItemText primary={`Item ${index + 1}`} secondary/>
            </ListItemButton>
        </ListItem>
    );

}


export default function ContractorHome() {

    const [coordsValues, setCoords] = useState(ContractorCoords);


    function getRequests() {
        //probably get requests from database but for now use these
        var count = 0;
        var unswLatitude = -33.917329664;
        var unswLongitude = 151.225332432; 

        var currentLongitude = (coordsValues.longitude * Math.PI / 180);
        var currentLatitude = (coordsValues.latitude * Math.PI / 180);

        unswLongitude = unswLongitude * Math.PI / 180;
        unswLatitude = unswLatitude * Math.PI / 180;

        if (unswLongitude > currentLongitude)
            var longitudeDistance = unswLongitude - currentLongitude;
        else if (unswLongitude < currentLongitude)
            var longitudeDistance = currentLongitude - unswLongitude;


        if (unswLatitude > currentLatitude)
            var latitudeDistance = unswLatitude - currentLatitude;
        else if (unswLatitude < currentLatitude)
            var latitudeDistance = currentLatitude - unswLatitude;
        

        //if currentLatitude - unswLatitude
        var a = Math.pow(Math.sin(latitudeDistance / 2), 2)
                        + Math.cos(unswLatitude) * Math.cos(currentLatitude)
                        * Math.pow(Math.sin(longitudeDistance / 2), 2);
        var b = 2 * Math.asin(Math.sqrt(a));

        var r = 6371 //radius of the earth;

        console.log("Distance is : ", b * r, "km");



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

    useEffect(() => {
        let ignore = false;
        if (!ignore) getLocation()

        getRequests()
        
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
                    itemCount={10} //this will be the amount of requests
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
            <Grid item xs={12} md={6}>
                <Typography variant='h6'>Request Details</Typography>
                {/*
                    This will have the list of the vehicles that need 
                    servicing withing 50km of the contractor
                    will include
                    1. Vehicle model
                    2. Vehicle manufacturer
                    2. Vehicle colour
                    3. Customer name
                    4. Any other details
                */}
                <Typography>
                    longitude: {coordsValues.longitude} and latitude: {coordsValues.latitude}
                </Typography>
            </Grid>
        </Grid>
    )
}