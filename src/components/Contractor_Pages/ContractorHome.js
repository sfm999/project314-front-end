import { useState } from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { deepOrange, grey } from '@mui/material/colors';

const vehicleList = {

};

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