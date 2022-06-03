import { Card, List, ListItem, ListItemText } from "@mui/material";

const ContractorAccountDetails = ({ profile }) => {
  return (
    <Card>
      <List>
        <ListItem>
          <ListItemText
            secondary={
              profile?.user?.first_name + " " + profile?.user?.last_name
            }
          >
            <strong>Account Owner</strong>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText secondary={profile?.BSB}>
            <strong>BSB</strong>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText secondary={profile?.account}>
            <strong>Account Number</strong>
          </ListItemText>
        </ListItem>
      </List>
    </Card>
  );
};

export default ContractorAccountDetails;
