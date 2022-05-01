import List from '@mui/material/List';
import {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import MailIcon from '@mui/icons-material/Mail';
import BadgeIcon from '@mui/icons-material/Badge';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

const customer = {
    "name": "Stuart", 
    "surname": "Miller",
    "email": "test@testmail.com.au",
    "plan":{"type": "subscription"}
  };

const Item = styled(Paper)(({ theme }) => ({
backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
...theme.typography.body2,
padding: theme.spacing(1),
textAlign: 'center',
color: theme.palette.text.secondary,
boxShadow: 'none',
maxHeight: "80px",
maxWidth: "100%", 
}));

export default function CustomerProfile(){

    const [client, setClient] = useState(customer);
    return(
        <Grid container spacing = {2}
            sx={{ paddingRight: "30px"}}>
           <Grid item xs={12} md={8}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BadgeIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Full Name"  secondary={customer.name + " " + customer.surname}  />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <MailIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Email Address"  secondary={customer.email}  />
                </ListItem>
            </List>
           </Grid>

           <Grid item xs={12} md={4}>
                <Item>
                    <Button variant ='outlined'
                        sx={{minWidth: "100%", border: "1px solid black", color: "#000"}}>Manage Current Vehicles</Button>
                </Item>
                
                <Item>
                    <Typography variant='h6' gutterBottom component='div'
                        sx={{paddingTop: "10px", paddingBottom: "10px"}}>
                        Payment Plan
                    </Typography>
                </Item>
                <Box sx={{border: "1px solid black"}}>
                <Item> 
                    <Typography variant="p"
                        sx={{fontWeight: "bold", fontSize: "large" }}>
                        {customer.plan.type}
                    </Typography>                
                </Item>

                <Item>
                    <Button variant ='outlined'
                        sx={{minWidth: "100%", border: "1px solid black", color: "#000"}}>Change Payment Plan</Button>
                </Item>
                </Box>
                <Item>
                        <Button variant="outlined"
                            sx={{minWidth: "100%", border: "0 solid black", backgroundColor: "#D11A2A", color: "white"}}>Delete Plan</Button>
                </Item>
           </Grid>
        </Grid>
    )
}