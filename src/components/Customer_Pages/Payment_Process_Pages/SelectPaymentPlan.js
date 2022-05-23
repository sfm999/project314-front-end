import { breadcrumbsClasses, Button, ButtonBase, Container, Grid, Paper, styled, Typography } from "@mui/material";
import CustomButton from "../../sub-components/CustomButton";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  lineHeight: "60px",
  margin: "5%",
}));

const SelectPaymentPlan = ({ subStatus, setSubStatus, handleNext }) => {

  const handleClick = (text) => {
    setSubStatus(text);
  }

  console.log(subStatus);
  return (
    <Container sx={{ width: "100%",}}>
      <Typography variant="h3" align="center">
        Select Payment Plan
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
      >
        <Grid item xs={6} sx={{alignItems: "center"}}>
          <ButtonBase onClick={() => handleClick("subscription")} sx={{ background: (subStatus === "subscription") ? "#48527d" : "white", margin: "15px", width: "100%", height: "45vh", fontSize: 34, boxShadow: 2}}>
            <Typography variant="h2" align="center">
              Subscription
            </Typography>
          </ButtonBase> 
        </Grid>
        <Grid item xs={6}>
          <ButtonBase onClick={() => handleClick("pay-on-demand")} sx={{ background: (subStatus === "pay-on-demand") ? "#48527d" : "white", margin: "15px", width: "100%", height: "45vh", fontSize: 34, boxShadow: 2}}>
            <Typography variant="h2" align="center">
              Pay-on-demand
            </Typography>
          </ButtonBase> 
        </Grid>
      </Grid>
    </Container>
    );
}
 
export default SelectPaymentPlan;