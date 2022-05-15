import { Card, Container, Grid, Typography } from "@mui/material";

const StepThree = () => {
  return (
    <Container sx={{ width: "100%",}}>
      <Typography variant="h3" align="left">
        Page Three
      </Typography>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          display: "relative"
        }}
      >
        <Grid item xs={6}>
          <Card sx={{ height: "50vh", margin: "20px", boxShadow: "3", }}>
            <Typography variant="h4" align="center">
              LHS
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: "50vh", margin: "20px", boxShadow: "3", }}>
            <Typography variant="h4" align="center">
              RHS
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
    );
}
 
export default StepThree;