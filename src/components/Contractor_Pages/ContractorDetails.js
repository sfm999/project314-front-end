import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";

export function ContractorDetails({ profile }) {
  return (
    <Card>
      <List sx={{ bgcolor: "Background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <BadgeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment> 
                {/* the react.fragment allows us to use multiple elements without adding 
                    extras node to the DOM */}

                {/*This is the full name label*/}
                <Typography
                  component="span"
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  Full Name
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>

                {/*This is where the actual first and last name get pulled from the 
                   home page and displayed to this page*/}
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {profile?.user.first_name + " " + profile?.user.last_name}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MailIcon /> {/*Email icon*/}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                {/*The label for the contractor email address*/}
                <Typography
                  component="span"
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  Email address
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                {/* where the email address gets pulled from the home page
                    and displayed here in this typography*/}
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {profile?.user.email}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>
              <BusinessCenterIcon /> {/*Business icon*/}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                {/* Where the ABN Labelled*/}
                <Typography
                  component="span"
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  ABN
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                {/* Where the ABN gets pulled from the home page
                    And displayed in this Typography*/}
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {profile?.ABN}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Card>
  );
}
export default ContractorDetails;
