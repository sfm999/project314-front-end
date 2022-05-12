import { Button, Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import { Box, createTheme, ThemeProvider } from '@mui/system';
import './css/Home.css';
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: {
            primary: "blue",
            secondary: "red",
          }
        }
      }
    }
  }
})

const CustomerHomePage = () => {
  return (
    <Box
      sx={{
        mx: 'auto',
        width: "90%",
        height: "100%",
      }}  
    >
      <CssBaseline />
      <Container 
        maxWidth
        sx={{
          padding: "10px",
        }}
      >
        <Typography
          variant="h2"
          component="h6"
          align="center"    
        >
          Home Page
        </Typography>
      </Container>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs >
          <Paper sx={{ minHeight: "65vh",}}>
            <Typography variant="h2" align="center" color="text.primary">
              Test
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ minHeight: "65vh",}}>
            <Typography variant="h2" align="center">
              Test
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ minHeight: "65vh" }}>
            <Typography variant="h2" align="center">
              Test
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box
        sx={{
          paddingTop: "5px",
        }}
      //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >

        <Button variant="contained" color="primary">
          test
        </Button>
        {/* <Button 
            variant="outlined"
            size='large'
            sx={{
              color: "black",
              border: "1px solid black",
              top: 0,
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
                border: "none"
                }
            }}
          >submit</Button> */}
      </Box>
      
    </Box>
    );
}
 
export default CustomerHomePage;