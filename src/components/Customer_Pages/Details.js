
import { Avatar, Card, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";

const Details = ({ customer }) => {
  return (
    <Card sx={{display: "flex", flexGrow: 1, minWidth: "240px"}}>
      <List sx={{ width: '100%', maxWidth: 420, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <BadgeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold'}}
                >
                  Full Name
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {customer.firstName + ' ' + customer.lastName}
                </Typography>
              </React.Fragment>
            }
           />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <MailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body1"
                    color="text.primary"
                    sx={{ fontWeight: 'bold'}}
                  >
                    Email address
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {customer.email}
                  </Typography>
                </React.Fragment>
              }
            />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body1"
                    color="text.primary"
                    sx={{ fontWeight: 'bold'}}
                  >
                    Age
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {customer.age + ' years old'}
                  </Typography>
                </React.Fragment>
              }
            />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AttachMoneyIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body1"
                    color="text.primary"
                    sx={{ fontWeight: 'bold'}}
                  >
                    Plan
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {customer.plan}
                  </Typography>
                </React.Fragment>
              }
            />
            
          
        </ListItem>
      </List>
    </Card>
  )
}

export default Details;