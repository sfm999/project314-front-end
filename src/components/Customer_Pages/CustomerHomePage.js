import { useCallback, useEffect, useState } from "react"; //Added by Ethan for modal stuff
import { Button, Card, CssBaseline, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import "../css/Home.css";
import ServiceRequest from "./Service_Request/ServiceRequest";
import ServiceRequestModal from "./Service_Request/ServiceRequestModal";
import Modal from "@mui/material/Modal"; //Import for MUI modal
import axios from "../../utils/axios"; //Added by Ethan for the Modal stuff

const Item = styled(Card)(({ theme }) => ({
  display: "relative",
  textAlign: "center",
}));

const defaultRequests = [
  {
    vehicle: "Toyota Corolla",
    vehicleRegistration: "RGY672",
    contractorName: "Ludicrous",
    issue: "Car is overheating",
    id: 1,
  },
  {
    vehicle: "Nissan Skyline",
    vehicleRegistration: "DKing",
    contractorName: "Jesse",
    issue: "Car ran out of fuel",
    id: 2,
  },
  {
    vehicle: "Toyota Camry",
    vehicleRegistration: "JSM123",
    contractorName: "Rocco",
    issue: "Car is having trouble steering",
    id: 3,
  },
  {
    vehicle: "Nissan Patrol",
    vehicleRegistration: "DKing",
    contractorName: "Jesse",
    issue: "Car ran out of coolant",
    id: 4,
  },
  {
    vehicle: "Toyota Corolla",
    vehicleRegistration: "ASM123",
    contractorName: "Rocco",
    issue: "Car is having trouble breaking",
    id: 5,
  },
  {
    vehicle: "Nissan GT Danga",
    vehicleRegistration: "Dangaa",
    contractorName: "Dang",
    issue: "Car ran out of God dang fuel or something maybe",
    id: 6,
  },
  {
    vehicle: "Toyota Hilux",
    vehicleRegistration: "Befcke",
    contractorName: "Beefboy",
    issue: "Car is having trouble keeping up with the other beefcakes",
    id: 7,
  },
  {
    vehicle: "Nissan Patrol",
    vehicleRegistration: "patrol",
    contractorName: "Patroller",
    issue: "Car ran out of the stuff that makes it cool",
    id: 8,
  },
  {
    vehicle: "Toyota Corolla",
    vehicleRegistration: "corola",
    contractorName: "Roccorola",
    issue: "Car is having problemsnpm rocking and/or rolling",
    id: 9,
  },
];

const vehicleValues = {
  vehicleRegistration: "JSM123",
  issue: "",
};

const requestValues = {
  name: "",
  registration: "",
  longitude: "",
  latitude: "",
};

const CustomerHomePage = () => {
  const [profile, setProfile] = useState();
  const [vehicle, setvehicle] = useState(vehicleValues);
  const [request, setRequest] = useState(requestValues);

  const [serviceOpen, setServiceOpen] = useState(false);

  const handleOpen = () => setServiceOpen(true);
  const handleClose = () => setServiceOpen(false);

  const sendDataToHomePage = (index) => {
    console.log(index);
    setRequest(index);
  };

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
    <Box
      sx={{
        mx: "auto",
        width: "90%",
        height: "100%",
      }}
    >
      <CssBaseline />

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="h3" sx={{ marginTop: "10px" }}>
            Home Page
          </Typography>
        </Grid>
      </Grid>

      <Card
        sx={{
          width: "100%",
          display: "relative",
        }}
      >
        <Grid container spacing={1} justifyContent="space-evenly">
          {defaultRequests.map((req) => {
            return (
              <Grid
                item
                xs={4}
                md={3}
                xl={2}
                sx={{
                  margin: "10px",
                  padding: "1px",
                }}
                key={req.id}
              >
                <Item
                  sx={{
                    maxWidth: "320px",
                    minWidth: "210px",
                    maxHeight: "301px",
                  }}
                >
                  <ServiceRequest request={req} />
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Card>

      {/* Request service button  */}
      <Button
        onClick={handleOpen}
        fullWidth
        variant="outlined"
        size="large"
        sx={{
          color: "black",
          border: "1px solid black",
          marginBottom: "10px",
          minHeight: "80px",
          fontSize: "1.8rem",
          top: 0,
          "&:hover": {
            backgroundColor: "black",
            color: "white",
            border: "none",
          },
        }}
      >
        Request Service
      </Button>

      <Modal
        open={serviceOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <ServiceRequestModal
          profile={profile}
          vehicle={vehicle}
          sendDataToHomePage={sendDataToHomePage}
        />
      </Modal>
    </Box>
  );
};

export default CustomerHomePage;
