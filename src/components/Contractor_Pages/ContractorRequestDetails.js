import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const ContractorRequestDetails = ({requests}) =>  {

    return (
        <List>
            <ListItem>
                <ListItemText 
                    primary="Customer Name: "
                    secondary={requests.name}
                    />

            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Issue Description"
                    /*PUT ISSUE DESCRIPTION*//>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Vehicle Details"/>
                {/*Have a List of the vehicle details*/}
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Distance"/>
            </ListItem>
        </List>
    );
}
export default ContractorRequestDetails;