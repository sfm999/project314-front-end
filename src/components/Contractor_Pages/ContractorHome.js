import * as React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { deepOrange, grey } from '@mui/material/colors';

const vehicleList = {

};

function getLongLat() {
    navigator.geolocation.getCurrentPosition(function(position){
        console.log("Latitude is : ", position.coords.latitude);
        console.log("Longitude is : ", position.coords.longitude);
    });


    //THIS IS FOR LATITUDE
    //1 degree latitude is equal to 111km :)
    //For examples 4 degrees = 4 x 111 = 444km
    //So we find the degrees and then subtract the smaller one from the bigger one
    //and that is the distance from each other in kilometers
    var unswLatitude = 33.9173;
    var unswLatitudeKM = 33.9173 * 110.574;
    console.log("Latitude KM : ", unswLatitudeKM);

    //THIS IS FOR LONGITUDE
    //1 degree longitude is equal to 111.320 x cos(latitude) :)
    //for example 4 degrees = 4 x (111.320 x cos(latitude))
    //so 111.320 x Math.cos(latitude)
    var unswLongitude = 151.2313; //these are in degrees so we need to use cos() or something to find the Kilometers
    var unswLongitudeKM = 151.2313 * (111.320 * Math.cos(unswLatitude));
    console.log("Longitude KM : ", unswLongitudeKM);


    //then position.coords.latitude - unswLatitude = the distance between those 2 points.
}

const requestInformation = {
    vehicleModel: "",
    vehicleManufacturer: "",
    vehicleColor: "",
    customerName: "",
}

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
                onClick = {getLongLat}

            //onclick open more details
            //also change background color on click
            >
                <ListItemText primary={`Item ${index + 1}`} secondary/>
            </ListItemButton>
        </ListItem>
    );

}

export default function ContractorHome() {




    return (
        <Grid container spacing = {2}>
            <Grid item xs={12} md={6}>
                <Typography variant='h6'>Service Requests</Typography>
                <FixedSizeList
                    height={400}
                    width={360}
                    itemSize={46}
                    itemCount={10}
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
            </Grid>
        </Grid>
    )
}