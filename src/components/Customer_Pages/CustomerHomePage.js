import { useCallback, useEffect, useState } from "react"; //Added by Ethan for modal stuff
import { Button, Card, Container, CssBaseline, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import '../css/Home.css';
import CustomButton from '../sub-components/CustomButton';
import ServiceRequest from './Service_Request/ServiceRequest';
import ServiceRequestModal from './Service_Request/ServiceRequestModal';
import Modal from '@mui/material/Modal'; //Import for MUI modal
import axios from "../../utils/axios"; //Added by Ethan for the Modal stuff

const Item = styled(Card)(({ theme }) => ({
  display: "relative",
  height: "73vh",
  textAlign: "center"
}));

const serviceRequests = [
  {
    vehicle: "Toyota Corolla",
    vehicleRegistration: "RGY672",
    contractorName: "Ludicrous",
    issue: "Car is overheating",
  },
  {
    customerName: "Nissan Skyline",
    vehicleRegistration: "DKing",
    contractorName: "Jesse",
    issue: "Car ran out of fuel",
  },
  {
    customerName: "Toyota Camry",
    vehicleRegistration: "JSM123",
    contractorName: "Rocco",
    issue: "Car is having trouble steering",
  },
]

const vehicleValues = {
  vehicleRegistration: "JSM123",
  issue: "",
}

const requestValues = {
  name: "",
  registration: "",
  longitude: "",
  latitude: "",
}


const CustomerHomePage = () => {
  const [profile, setProfile] = useState();
  const [vehicle, setvehicle] = useState(vehicleValues);
  const [modalOpen, setOpen] = useState(false);
  const [request, setRequest] = useState(requestValues);
  const serviceOpen = () => setOpen(true);
  const serviceClose = () => setOpen(false);

  const sendDataToHomePage = (index) => {
    console.log(index);
    setRequest(index);
  }

  const fetchData = useCallback(async () => {
    const ID = window.localStorage.getItem("userID");
    console.log("Printing from within fetchData:", ID);
    await axios.get(`users/${ID}`).then((response) => {
      setProfile(response.data);
      console.log("The data from the response given by axios:", response.data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
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
              <Typography variant="h4" component="h6" noWrap>
                Request Details
              </Typography> 
              
              {/* Divider */}
              <Divider sx={{ marginTop: "10px", marginBottom: "10px"}}/>

              <Container></Container>
              <CustomButton text="Make a new service request" />
              <Item sx={{overflow: "auto"}}>
                <Card sx={{margin: "5px", display: "relative"}}>
                  <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ display: "relative",}}>
                  {serviceRequests && serviceRequests.map((request) => {
                    return (
                      <Grid item>
                        <Card sx={{ margin: "10px", boxShadow: 3, width: "100%"}}>
                          <ServiceRequest request={request} />
                        </Card>
                      </Grid>
                    );
                  })}
                  </Grid>
                  
                  { }
                </Card>
              </Item>
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
            onClick = {serviceOpen}
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
          <Modal
            open = {modalOpen}
            onClose = {serviceClose}
            aria-labelledby="modal-title"
          >
            <ServiceRequestModal profile={profile} vehicle={vehicle} sendDataToHomePage={sendDataToHomePage}/>
          </Modal>
          
    </Box>
    );
}
 
export default CustomerHomePage;