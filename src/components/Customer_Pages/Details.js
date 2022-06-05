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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";

// Takes in profile which is used to populate the list items
export function Details({ profile }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexGrow: 1,
        minWidth: "240px",
        backgroundColor: "#f1f0f8",
      }}
    >
      <List sx={{ width: "100%", maxWidth: 420, bgcolor: "#f1f0f8" }}>
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
                  sx={{ fontWeight: "bold" }}
                >
                  Full Name
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                {profile?.user && (
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {profile?.user.first_name + " " + profile?.user.last_name}
                  </Typography>
                )}
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
                  sx={{ fontWeight: "bold" }}
                >
                  Email address
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                {profile?.user && (
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {profile?.user.email}
                  </Typography>
                )}
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
                  sx={{ fontWeight: "bold" }}
                >
                  Plan
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                {profile?.user && (
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {profile?.subscription_status === "S"
                      ? "Subscription"
                      : "Pay-on-Demand"}
                  </Typography>
                )}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Card>
  );
}

export default Details;
