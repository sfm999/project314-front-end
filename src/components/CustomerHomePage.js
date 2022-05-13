import { Button, Card, CssBaseline, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import './css/Home.css';

const Item = styled(Card)(({ theme }) => ({
  display: "relative",
  height: "73vh",
  textAlign: "center"
}));



const CustomerHomePage = () => {
  return (
    // Overarching container 
    <Box
      sx={{
        mx: 'auto',
        width: "90%",
        height: "100%",
      }}  
    >
      <CssBaseline />

      {/* Title of the page  */}
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h3" sx={{ marginTop: "10px"}}>
            Home Page
          </Typography>
        </Grid>
      </Grid>

      {/* Going for a card effect to outline workable screen area */}
      <Card
        sx={{
          width: "100%",
          height: "75vh",
          display: "relative",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{
            marginTop: "10px"
          }}  
        >
          {/* Request Details */}
          <Grid item xs={3}>
            <Card sx={{ display: "relative", height: "73vh", textAlign: "center",}}>
              <Card sx={{margin: "5px"}}>
                <Typography variant="h4">
                  Request Details
                </Typography>
                {/* Some flavour text  */}
                <Typography variant="body2" align="justify" sx={{margin: "10px"}}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ex unde. Nesciunt eos exercitationem atque alias eum ipsum, commodi, in deserunt quos aliquam, velit odio assumenda officiis perspiciatis repellat cumque!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit accusamus totam quidem reiciendis minus minima quibusdam, sapiente fugit similique ex cupiditate aspernatur illum, quasi neque laudantium error, nihil accusantium ut?
                </Typography>
              </Card>
            </Card>
          </Grid>

          {/* List of Contractors */}
          <Grid item xs={6}>
            <Item>
              <Card sx={{margin: "5px"}}>
                <Typography variant="h4" sx={{ h4: { fontSize: ""}}}>
                  List of Contractors
                </Typography>
                {/* Some flavour text  */}
                <Typography variant="body2" align="justify" sx={{margin: "10px"}}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ex unde. Nesciunt eos exercitationem atque alias eum ipsum, commodi, in deserunt quos aliquam, velit odio assumenda officiis perspiciatis repellat cumque!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit accusamus totam quidem reiciendis minus minima quibusdam, sapiente fugit similique ex cupiditate aspernatur illum, quasi neque laudantium error, nihil accusantium ut?
                </Typography>
              </Card>
            </Item>
          </Grid>

          {/* List of Contractors */}
          <Grid item xs={3}>
            <Card sx={{ display: "relative", height: "73vh", textAlign: "center",}}>
              <Card sx={{margin: "5px"}}>
                <Typography variant="h4" sx={{ h4: { fontSize: ""}}}>
                  Your Contractor
                </Typography>
                {/* Some flavour text  */}
                <Typography variant="body2" align="justify" sx={{margin: "10px"}}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ex unde. Nesciunt eos exercitationem atque alias eum ipsum, commodi, in deserunt quos aliquam, velit odio assumenda officiis perspiciatis repellat cumque!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit accusamus totam quidem reiciendis minus minima quibusdam, sapiente fugit similique ex cupiditate aspernatur illum, quasi neque laudantium error, nihil accusantium ut?
                </Typography>
              </Card>
            </Card>
          </Grid>

        </Grid>

      </Card>

      {/* Request service button  */}
      <Button 
            fullWidth
            variant="outlined"
            size='large'
            sx={{
              color: "black",
              border: "1px solid black",
              marginBottom: "10px",
              minHeight: "80px",
              fontSize:"1.8rem",
              top: 0,
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
                border: "none"
                }
            }}
          >Request Service</Button>
    </Box>
    );
}
 
export default CustomerHomePage;