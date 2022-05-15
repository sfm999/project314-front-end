import * as React from 'react';
import {useState} from 'react';
import { alpha, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { deepOrange } from '@mui/material/colors';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useNavigate } from 'react-router-dom';

import { setSession } from '../../utils/jwt'
import axios from '../../utils/axios';


const defaultDetails = {
    name: "",
    BSB: "",
    account_number: "",
}

export default function ContractorBankDetails() {
    const [detailsValues, setDetailsValues] = useState(defaultDetails);
    const [textfieldsDisabled, setDisabled] = React.useState(true);

    function handleEdit() {
        setDisabled(true);
    }

    const handleDetailChange = (e) => {
        const {name, value } = e.target;

        setDetailsValues({
            ...detailsValues,
            [name]: value,
        });
    };

    const changeDetails = async(name, BSB, account_number) => {

    };


    const handleAccept = (event) => {
        event.preventDefault();
        const details = new FormData(event.currentTarger);

        changeDetails(details.get('name'), details.get('BSB'), details.get('account_number'));
    };
 
    return (
        /*Use a bunch of text fields
        THE DEFAULT VALUES WILL BE THE CONTRACTORS CURRENT
        BANK DETAILS */
        <Grid container spacing = {2} sx={{ paddingRight: "30px"}}>
            <Grid item xs={12} md={6}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemText primary="Name" secondary ={defaultDetails.name} />
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="BSB" secondary = {defaultDetails.BSB} />
                    </ListItem>

                    <ListItem>
                        <ListItemText primary = "Account Number" secondary = {defaultDetails.account_number} />
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} md={6}>
                <Button variant="contained">
                    Edit Bank Details
                </Button>
            </Grid>
        </Grid>
    );
};