import { Card, Container, Grid, Paper, styled, Typography } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  lineHeight: "60px",
  margin: "5%",
}));

const StepOne = () => {
  return (
    <Container sx={{ width: "100%",}}>
    <Typography variant="h3" align="center">
      Step One
    </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
      >
        <Grid item xs={6} sx={{alignItems: "center"}}>
          <Item>
            <Typography variant="h4">
              Subscription
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography variant="h4">
              Pay-on-Demand
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Container>
    );
}
 
export default StepOne;