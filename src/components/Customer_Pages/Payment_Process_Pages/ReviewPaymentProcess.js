import { Card, Container, Grid, Typography } from "@mui/material";

const ReviewPaymentProcess = () => {
  return (
    <Container sx={{ width: "100%",}}>
    <Typography variant="h3" align="left">
      Review
    </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="stretch"
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
 
export default ReviewPaymentProcess;