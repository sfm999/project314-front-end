import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTextBox from '../../sub-components/CustomTextBox';

const PersonalDetails = () => {
  return (
    <Container sx={{ display: "relative"}}>
      <Typography variant="h3" align="left">
        Enter Personal Details
      </Typography>
      <Box>
        <Grid
          container
          sx={{
            display: "relative",
            margin: "auto",
          }}
        >
          {/* Line 1 | Full name*/}
          <Grid item xs={12}>
            <CustomTextBox name="full_name" label="Full name" id="full_name" />
          </Grid>
          {/* Line 2 | Address line 1 */}
          <Grid item xs={12}>
            <CustomTextBox name="address1" label="Address line 1" id="address1" />
          </Grid>
          {/* Line 3 | Address line 2 */}
          <Grid item xs={12}>
            <CustomTextBox name="address2" label="Address line 2" id="address2" />
          </Grid>

          {/* Line 4 | city */}
          <Grid item xs={5}>
            <CustomTextBox name="city" label="City" id="city" />
          </Grid>

          {/* Makes a gap between fields */}
          <Grid item xs={2} />

          {/* Line 4 | state */}
          <Grid item xs={5}>
            <CustomTextBox name="state" label="State" id="state" />
          </Grid>

          {/* Line 5 | phone */}
          <Grid item xs={5}>
            <CustomTextBox name="phone" label="Phone" id="phone" />
          </Grid>

          {/* Makes a gap between fields */}
          <Grid item xs={2} />

          {/* Line 5 | fax */}
          <Grid item xs={5}>
            <CustomTextBox name="fax" label="Fax" id="fax" />
          </Grid>

          {/* Line 6 | ABN */}
          <Grid item xs={12}>
            <CustomTextBox name="abn" label="ABN" id="abn" />
          </Grid>

        </Grid>
      </Box>
    </Container>
    );
}
 
export default PersonalDetails;