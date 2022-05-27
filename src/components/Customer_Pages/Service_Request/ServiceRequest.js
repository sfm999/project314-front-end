import { Container } from "@mui/system";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Card,
} from "@mui/material";
import React from "react";
import ListItemTextContainer from "../../sub-components/ListItemTextContainer";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// customerName: "Bill Burr"
// vehicleRegistration: "rgy672"
// contractorName: "Ludicrous"
// issue: "Car is overheating"

const ServiceRequest = ({ request }) => {
  return (
    <List sx={{ width: "100%", backgroundColor: "#bdbdbd" }}>
      {/* Customer requesting service */}
      <ListItem alignItems="flex-start">
        {/* Customer icon */}
        <ListItemAvatar>
          <DirectionsCarIcon />
        </ListItemAvatar>

        {/* Customer | {request.customerName} */}
        <ListItemTextContainer
          primaryText="Vehicle"
          secondaryText={request.vehicle}
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
          secondaryText={request.vehicleRegistration}
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
          secondaryText={request.contractorName}
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
          secondaryText={request.issue}
        />
      </ListItem>
    </List>
  );
};

export default ServiceRequest;
