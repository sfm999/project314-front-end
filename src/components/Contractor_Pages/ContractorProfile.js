import { useState } from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { deepOrange } from '@mui/material/colors';

import Avatar from '@mui/material/Avatar';
import BadgeIcon from '@mui/icons-material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Typography } from '@mui/material';

import { setSession } from '../utils/jwt';
import axios from '../utils/axios';

const contractor = {

    "first_name": "Jeff",//something.getdata(first_name)
    "last_name": "Bezos",
    "email": "JB111@uowmail.edu.au",
    "abn": "51 824 753 556",
    //password: 1234567890
};

//need a component that gets the information




export default function ContractorProfile() {
    const [cont, setContractor] = useState(contractor);
/*
    const setContractor = async (first_name, last_name, email, password) => {
        await axios.get() //then get the details
    };
*/
    return(
        <Grid container spacing = {2} sx={{ paddingRight: "30px"}}>
            <Grid item xs={12} md={8}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BadgeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Full Name" secondary ={contractor.first_name + " " + contractor.last_name} />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <MailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email Address" secondary = "email" />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BusinessCenterIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary = "ABN" secondary = {contractor.abn} />
                    </ListItem>
                </List>
            </Grid>
            
            <Grid item xs={12} md={4}>
                <Grid item xs={12} md={15}>
                    <Button variant = 'contained'>
                        Manage Bank Details
                    </Button>
                    {/*This whole list can me moved to another page */}
                    <List>
                        <ListItem>
                            <ListItemText primary = "Card Owner" secondary = {contractor.first_name + " " + contractor.last_name}/>
                            <ListItemText primary = "CVV" secondary = "their cvv"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary = "Card Number" secondary = "Some number"/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary = "Expiry Date" secondary = "Some date"/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button variant = 'contained' color = "error">
                        Delete Account
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}