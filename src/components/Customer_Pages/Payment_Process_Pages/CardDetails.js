import { Container, Grid, Typography } from "@mui/material";
import CustomTextBox from "../../sub-components/CustomTextBox";

const CardDetails = () => {
  return (
    <Container>
      <Typography variant="h3" align="left">
        Card Details
      </Typography>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          sx={{
            display: "relative",
            margin: "auto",
          }}
        >
          {/* Line 1 | Name on card*/}
          <Grid item xs={12}>
            <CustomTextBox name="card_name" label="Full name" id="full_name" />
          </Grid>
          {/* Line 2 | Card number*/}
          <Grid item xs={12}>
            <CustomTextBox name="card_number" label="Card Number" id="card_number" />
          </Grid>

          {/* Line 3 | Expiry date */}
          <Grid item xs={5}>
            <CustomTextBox name="exp_date" label="Expiry Date" id="exp_date" />
          </Grid>

          {/* Makes a gap between fields */}
          <Grid item xs={2} />

          {/* Line 3 | Security Code */}
          <Grid item xs={5}>
            <CustomTextBox name="sec_code" label="Security Code" id="sec_code" />
          </Grid>

          {/* Line 4 | Postcode */}
          <Grid item xs={12}>
            <CustomTextBox name="abn" label="ABN" id="abn" />
          </Grid>

        </Grid>
      </Container>
    </Container>
    );
}
 
export default CardDetails;