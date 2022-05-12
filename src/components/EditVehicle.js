import { Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, Input, InputLabel, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

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


const EditVehicle = () => {
  return (
    <Box style={{ height: "60vh", width: '90%', margin: "auto", paddingTop: "10px",}}>
    <CssBaseline />
    
      <Typography component="h1" variant="h3">
          Edit a vehicle
      </Typography>
    <Box
      sx={{
          marginTop: "10px",
          display: 'relative',
          flexDirection: 'column',
      }}
    >
      <Box component="form" noValidate>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={10}
          justifyContent="space-evenly"
        >

          {/* Get vehicle Make  */}
          <Grid item xs={6}>
            <TextBox
                margin="normal"
                required
                fullWidth
                name="vehicle make"
                label="Vehicle Make"
                type="text"
                id="make"
                variant="outlined"              
            />
          </Grid>

          {/* Get vehicle Model  */}
          <Grid item xs={6}>
            <TextBox
                margin="normal"
                required
                fullWidth
                name="vehicle model"
                label="Vehicle Model"
                type="text"
                id="model"
                variant="outlined"
            />
          </Grid>
          
          {/* Get vehicle registration  */}
          <Grid item xs={6}>
            <TextBox
                margin="normal"
                required
                fullWidth
                name="vehicle registration"
                label="Vehicle Registration"
                type="text"
                id="rego"
                variant="outlined"
            />
          </Grid>

          {/* Get vehicle colour  */}
          <Grid item xs={6}>
            <TextBox
                margin="normal"
                required
                fullWidth
                name="vehicle colour"
                label="Vehicle Colour"
                type="text"
                id="colour"
                variant="outlined"
            />
          </Grid>

          {/* Get vehicle Year  */}
          <Grid item xs={6}>
            <TextBox
                margin="normal"
                required
                fullWidth
                name="vehicle year"
                label="Year of production"
                type="text"
                id="year"
                variant="outlined"              
            />
          </Grid>

          {/* Serves to push the year textfield to the left with breakpoint technology */}
          <Grid item xs={6} />

          {/* Add vehicle button/form control submit */}
          <Grid container xs={12} justifyContent="flex-end">
            <Grid item>
              <Button
                  type="submit"
                  size="large"
                  variant="outlined"
                  sx={{
                    color: "black",
                    border: "1px solid black",
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                      border: "none"
                    },
                    mb: 2,
                  }}
                  
              >Edit vehicle</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Box>
  );
}
 
export default EditVehicle;