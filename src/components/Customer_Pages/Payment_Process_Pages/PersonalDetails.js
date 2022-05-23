import { Container, Grid, Typography, styled, TextField} from "@mui/material";
import { Box } from "@mui/system";
import CustomTextBox from '../../sub-components/CustomTextBox';

const TextBox = styled(TextField) ({
  '& input:valid + fieldset': {
      borderColor: '#c2c2c2',
      borderWidth: 2,
  },
  '& input:invalid + fieldset': {
      borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important',
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: '#c2c2c2',
      },
      '&:hover fieldset': {
          borderColor: '#f2f2f2',
      },
      '&.Mui-focused fieldset': {
          borderColor: '#f2f2f2',
      },
    },
});

const PersonalDetails = ({ setDetails, currentDetails }) => {

  const handleFormChange = (e) => {
    setDetails(e);
  }


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
            <TextBox
              margin="normal"
              required
              fullWidth
              name="fullName"
              label="Full Name"
              id="fullName"
              variant="outlined"
              autoFocus
              onChange={handleFormChange}
              value={currentDetails.fullName}
            />
          </Grid>
          {/* Line 2 | Address line 1 */}
          <Grid item xs={12}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="address1"
              label="Address Line 1"
              id="address1"
              variant="outlined"
              onChange={handleFormChange}
              value={currentDetails.address1}
            />
          </Grid>
          {/* Line 3 | Address line 2 */}
          <Grid item xs={12}>
          <TextBox
              margin="normal"
              required
              fullWidth
              name="address2"
              label="Address Line 2"
              id="address2"
              variant="outlined"
              onChange={handleFormChange}
              value={currentDetails.address2}
            />
          </Grid>

          {/* Line 4 | city */}
          <Grid item xs={5}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="city"
              label="City"
              id="city"
              variant="outlined"
              onChange={handleFormChange}
              value={currentDetails.city}
            />
          </Grid>

          {/* Makes a gap between fields */}
          <Grid item xs={2} />

          {/* Line 4 | state */}
          <Grid item xs={5}>
            <TextBox
              margin="normal"
              required
              fullWidth
              name="state"
              label="State"
              id="state"
              variant="outlined"
              onChange={handleFormChange}
              value={currentDetails.state}
            />
          </Grid>

          {/* Line 5 | phone */}
          <Grid item xs={5}>
          <TextBox
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              id="phone"
              variant="outlined"
              onChange={handleFormChange}
              value={currentDetails.phone}
            />
          </Grid>

          {/* Makes a gap between fields */}
          <Grid item xs={2} />

          {/* Line 5 | fax */}
          <Grid item xs={5}>
          <TextBox
              margin="normal"
              required
              fullWidth
              name="fax"
              label="Fax"
              id="fax"
              variant="outlined"
              onChange={handleFormChange}
              value={currentDetails.fax}
            />
          </Grid>

        </Grid>
      </Box>
    </Container>
    );
}
 
export default PersonalDetails;