import { Card, Container, Grid, Typography } from "@mui/material";
import CustomTextBox from "../../sub-components/CustomTextBox";

const StepTwo = () => {
  return (
    <Container sx={{ width: "100%", display: "relative"}}>
      <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
        >
          {/* Title */}
          <Grid item xs={12} sx={{margin: "auto", paddingBottom: "8px"}}>
            <Typography variant="h3" align="left">
              Page Two
            </Typography>
          </Grid>

        {/* Contains the form fields */}
        <Container sx={{width: "65%"}}>
            {/* Name on card field */}
            <Grid item xs={12}>
              <CustomTextBox name="card-name" label="Name on card" id="card-name" />
            </Grid>

            {/* Card Number field */}
            <Grid item xs={12}>
              <CustomTextBox name="card-number" label="Card Number" id="card-number" />
            </Grid>

            <Grid container spacing={2}>
              {/* Expiry Date field */}
              <Grid item xs={6}>
                <CustomTextBox name="card-name" label="Expiry Date" id="card-exp" />
              </Grid>
            
              {/* Security Code field */}
              <Grid item xs={6}>
                <CustomTextBox name="card-sec-code" label="Security Code" id="card-sec-code" />
              </Grid>
            </Grid>

              {/* Postcode field */}
              <Grid item xs={12}>
                <CustomTextBox name="card-postcode" label="Postcode" id="card-postcode" />
              </Grid>
        </Container>
      </Grid>
    </Container>
    );
}
 
export default StepTwo;