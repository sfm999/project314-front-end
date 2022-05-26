import { Button, Card, Container, CssBaseline, Divider, Grid, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import '../css/Home.css';
import CustomButton from '../sub-components/CustomButton';
import ServiceRequest from './Service_Request/ServiceRequest';
import { useState } from 'react';

const Item = styled(Card)(({ theme }) => ({
  display: "relative",
  height: "73vh",
  textAlign: "center"
}));

const defaultRequests = [
  {
    vehicle: "Toyota Corolla",
    vehicleRegistration: "RGY672",
    contractorName: "Ludicrous",
    issue: "Car is overheating",
  },
  {
    vehicle: "Nissan Skyline",
    vehicleRegistration: "DKing",
    contractorName: "Jesse",
    issue: "Car ran out of fuel",
  },
  {
    vehicle: "Toyota Camry",
    vehicleRegistration: "JSM123",
    contractorName: "Rocco",
    issue: "Car is having trouble steering",
  },
]


const CustomerHomePage = () => {

  const [requests, setRequests] = useState(defaultRequests);
  const [showModal, setShowModal] = useState(false);
  
  const addRequest = (request) => {
    setRequests((prevRequests) => {
      return [...prevRequests, request]
    })    
    setShowModal(false);
  }

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
          display: "relative",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          sx={{
            marginTop: "10px"
          }}  
        >
          <Grid container>
            {/* Request Details */}
            <Grid item xs={4} >
              {/* Title */}
              <Typography variant="h4" component="h6" noWrap align="center">
                Request Details
              </Typography> 
              
              {/* Divider */}
              <Divider sx={{ marginTop: "10px", marginBottom: "10px"}}/>

              <div style={{textAlign: "center"}}>
                <CustomButton text="Make a new service request" />
              </div>
              
              <Item sx={{overflow: "auto"}}>
                <Card sx={{margin: "5px", display: "relative"}}>
                  <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ display: "relative",}}>
                  {defaultRequests && defaultRequests.map((request) => {
                    return (
                      <Grid item>
                        <Card sx={{ display: "block", margin: "10px", boxShadow: 3, width: "100%"}}>
                          <ServiceRequest request={request} />
                        </Card>
                      </Grid>
                    );
                  })}
                  </Grid>
                  
                  { }
                </Card>
              </Item>
                
              { showModal && <Modal>
                test
              </Modal>}
            </Grid>

            {/* List of Contractors */}
            <Grid item xs={4}>
              <Item>
                <Card sx={{margin: "5px"}}>

                  {/* Title */}
                  <Typography variant="h4" component="h6" noWrap>
                    List of Contractors
                  </Typography>

                  
                </Card>
              </Item>
            </Grid>

            {/* List of Contractors */}
            <Grid item xs={4}>
              <Item>
                <Card sx={{margin: "5px"}}>

                  {/* Title */}
                  <Typography variant="h4" component="h6" noWrap>
                    Your Contractor
                  </Typography>

                </Card>
              </Item>
            </Grid>
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
            onClick={handleNewRequest}
          >Request Service</Button>
    </Box>
    );
}
 
export default CustomerHomePage;