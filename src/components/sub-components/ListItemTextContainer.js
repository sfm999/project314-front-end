import { ListItemText, Typography } from "@mui/material";
import React from 'react';

/*
  Text container styling and formatting for the listitemtext
*/

const ListItemTextContainer = ({ primaryText, secondaryText}) => {
  return (
    <ListItemText
      primary={
        <React.Fragment>
          <Typography
            component="span"
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: "bold" }}
          >
            { primaryText }
          </Typography>
        </React.Fragment>
      }
      secondary={
        <React.Fragment>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {secondaryText}
          </Typography>
        </React.Fragment>
      }
    />
   );
}
 
export default ListItemTextContainer;