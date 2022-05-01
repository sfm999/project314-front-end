import List from '@mui/material/List';
import {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import MailIcon from '@mui/icons-material/Mail';
import BadgeIcon from '@mui/icons-material/Badge';
import Button from '@mui/material/Button';
import Plan from './Plan';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const customer = {
    "name": "Stuart", 
    "familyName": "fletcher-miller",
    "email": "test@testmail.com.au",
    "plan":{"type": "subscription"}
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  


export default function CustomerProfile(){
    const [client, setClient] = useState(customer);
    return(
        <Grid container spacing = {2}>
           <Grid item xs={8}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BadgeIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="First Name"  secondary={customer.name}  />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BadgeIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Family Name"  secondary={customer.familyName}  />
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

           <Grid item xs={4}>
                <Item>
                <Button variant ='outlined' size="large" >Mannage Current Vehicles</Button>
                </Item>
                    
                <Item>
                    <Plan plan={customer.plan} /> 
                </Item>
           </Grid>
        </Grid>
    )
}