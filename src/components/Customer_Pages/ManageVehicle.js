import { Alert, Button, CssBaseline, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../sub-components/CustomButton";

import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";

const columns = [
  { field: "make", headerName: "Make", flex: 1 },
  { field: "model", headerName: "Model", flex: 1 },
  {
    field: "year",
    headerName: "Year",
    flex: 1,
  },
  {
    field: "rego",
    headerName: "Registration",
    flex: 1,
  },
];

const ManageVehicle = () => {
  // Get user id from the useAuth() hook
  const { userID } = useAuth();
  // containes the selected rows of the table
  const [selectedRows, setSelectedRows] = useState([]);
  // Responsible for determining if user clicked edit button.
  const [editAlert, setEditAlert] = useState(false);
  // contains the list of vehicles gotten from the API
  const [vehicleList, setVehicleList] = useState([]);

  // Allows for on-the-fly navigation of url's as well as taking data in
  let navigate = useNavigate();

  // Handles the adding of a vehicle by redirecting to the add vehicle page/component
  const handleAddVehicleClick = () => {
    const path = "/customer/vehicles/add";
    navigate(path);
  };

  // Responsible for checking whether only 1 vehicle is selected (editAlert = true if 0 or more than 1 vehicle is selected)
  // navigate to custom vehicle edit page for the vehicle if no editAlert
  const handleEditVehicleClick = () => {
    if (selectedRows.length === 0) {
      setEditAlert(true);
    } else if (selectedRows.length > 1) {
      setEditAlert(true);
    } else {
      const path = `/customer/vehicles/${selectedRows[0]}/edit`;
      navigate(path);
    }
  };

  // Handles the remove vehicle click, which uses the id, gotten from selectedRows
  const removeVehicle = async (id) => {
    // Delete from database via API
    axios.delete(`users/vehicles/${id}`).then((response) => {
      console.log(response.data);
    });
  };

  const handleRemoveVehicles = () => {
    // API call to remove vehicle for each selected as gained from selectedRows
    for (let i = 0; i < selectedRows.length; i += 1) {
      removeVehicle(selectedRows[i]);
    }

    // Filter vehicle list to match on client side to prevent extra call
    setVehicleList(
      vehicleList.filter((row) => {
        return !selectedRows.includes(row.id);
      })
    );
  };

  // Grabs the vehicles from the API for the specific user,
  // as specified by the userID gained from useAuth()
  const fetchVehicles = async () => {
    axios.get(`users/vehicles/?user=${userID}`).then((response) => {
      console.log(response.data);
      setVehicleList(response.data);
    });
  };

  // Grab the vehicles on component loading (see function above)
  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <Box
      minHeight="215px"
      // height="30vh"
      style={{
        height: "40vh",
        margin: "auto",
        paddingTop: "20px",
      }}
    >
      {/* <CssBaseline /> */}
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">Vehicles</Typography>
        </Grid>
        <Grid item xs={4}>
          {editAlert && (
            <Alert severity="error">You must select only one vehicle</Alert>
          )}
        </Grid>
        <Grid item xs={3} />
      </Grid>

      {/* The table that stores the vehicles */}
      <DataGrid
        rows={vehicleList}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setEditAlert(false);
          setSelectedRows(ids);
        }}
        sx={{
          marginTop: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "10px",
          width: "100%",
        }}
      />

      {/* Bar underneath table, containing add, edit, and remove button */}
      <Box>
        <Grid
          container
          justifyContent="space-evenly"
          rowSpacing={1}
          sx={{
            marginBottom: "10px",
            display: "relative",
            paddingBottom: "10px",
          }}
        >
          {/* Add button */}
          <Grid item>
            <CustomButton
              text="Add new vehicle"
              onClick={handleAddVehicleClick}
              size="large"
            />
          </Grid>

          {/* Edit button */}
          <Grid item>
            <CustomButton
              text="Edit a vehicle"
              onClick={handleEditVehicleClick}
              size="large"
            />
          </Grid>

          {/* Remove button */}
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
              onClick={handleRemoveVehicles}
            >
              Remove a vehicle
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ManageVehicle;
