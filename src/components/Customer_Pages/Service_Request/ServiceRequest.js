// React and MUI imports
import React from "react";
import { Button, Card, CssBaseline, List, ListItem, ListItemAvatar, Stack } from "@mui/material";

// Icons
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ListItemTextContainer from "../../sub-components/ListItemTextContainer";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// Responsible for displaying the information within a card element
// on the home screen once a service request has been submitted.
const ServiceRequest = ({ request }) => {
  return (
    <Card>
    <Stack direction="column">
      <List
        sx={{
          width: "100%",
          backgroundColor: "#8c8b9f",
          padding: "5px",
        }}
      >
        {/* Customer requesting service */}
        <ListItem alignItems="flex-start">
          {/* Customer icon */}
          <ListItemAvatar>
            <DirectionsCarIcon />
          </ListItemAvatar>

          {/* Customer | {request.customerName} */}
          <ListItemTextContainer
            primaryText="Vehicle"
            secondaryText={`${request.vehicle.make} ${request.vehicle.model}`}
          />
        </ListItem>

        {/* Vehicle Registration */}
        <ListItem>
          {/* Vehicle Registration icon */}
          <ListItemAvatar>
            <ReceiptLongIcon />
          </ListItemAvatar>

          {/* Vehicle Registration | {request.vehicleRegistration} */}
          <ListItemTextContainer
            primaryText="Vehicle Registration"
            secondaryText={request.vehicle.rego}
          />
        </ListItem>

        {/* Contractor Assigned */}
        <ListItem alignItems="flex-start">
          {/* Mechanic icon */}
          <ListItemAvatar>
            <HomeRepairServiceIcon />
          </ListItemAvatar>

          {/* Contractor | {request.contractorName} */}
          <ListItemTextContainer
            primaryText="Contractor"
            secondaryText={
              request.contractor.first_name
                ? `${request.contractor.first_name} ${request.contractor.last_name}`
                : "Request Pending"
            }
          />
        </ListItem>

        {/* Car Issue */}
        <ListItem alignItems="flex-start">
          {/* Car Problem Icon */}
          <ListItemAvatar>
            <CarCrashIcon />
          </ListItemAvatar>

          {/* Car Problem | {request.issue} */}
          <ListItemTextContainer
            primaryText="Issue"
            secondaryText={request.description}
          />
        </ListItem>
      </List>
      <Button variant="outlined" style={{backgroundColor:"#d32f2f", color: "white", borderTopLeftRadius: 0, borderTopRightRadius: 0, borderWidth: 0, }}>Cancel Request</Button>
    </Stack>
    </Card>
  );
};

export default ServiceRequest;
