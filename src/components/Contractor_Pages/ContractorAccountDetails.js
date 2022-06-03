import { Card, List, ListItem, ListItemText, Typography } from "@mui/material";

const ContractorAccountDetails = ({ profile }) => {
  return (
    <Card>
      <Typography
        variant="h6"
        sx={{
          paddingRight: "16px",
          paddingLeft: "16px",
        }}
      >
        <strong>Bank Details</strong>
      </Typography>
      <List sx={{ paddingTop: "0px" }}>
        <ListItem sx={{ paddingTop: "0px" }}>
          <ListItemText
            secondary={
              profile?.user?.first_name + " " + profile?.user?.last_name
            }
          >
            <strong>Account Owner</strong>
          </ListItemText>
        </ListItem>
        <ListItem sx={{ paddingTop: "0px" }}>
          <ListItemText secondary={profile?.BSB}>
            <strong>BSB</strong>
          </ListItemText>
        </ListItem>
        <ListItem sx={{ paddingTop: "0px" }}>
          <ListItemText secondary={profile?.account}>
            <strong>Account Number</strong>
          </ListItemText>
        </ListItem>
      </List>
    </Card>
  );
};

export default ContractorAccountDetails;
