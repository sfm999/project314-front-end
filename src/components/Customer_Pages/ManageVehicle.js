import { Alert, Button, CssBaseline, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../sub-components/CustomButton";

import axios from "../../utils/axios";

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

let rows = [
  { id: 1, make: "Toyota", model: "Corolla", year: 1992 },
  { id: 2, make: "Mitsubishi", model: "Pajero", year: 2004 },
  { id: 3, make: "Nissan", model: "Skyline", year: 1993 },
  { id: 4, make: "Volkswagon", model: "Tureg", year: 2010 },
  { id: 5, make: "Mercedes", model: "Benz C-Class", year: 2018 },
  { id: 6, make: "BMW", model: "m4", year: 2021 },
  { id: 7, make: "Tesla", model: "X", year: 2021 },
  { id: 8, make: "Honda", model: "Accord", year: 2008 },
  { id: 9, make: "Volvo", model: "850", year: 1991 },
  { id: 10, make: "Lexus", model: "RX300", year: 1996 },
];

const ManageVehicle = () => {
  // Need to figure out a way to pass the vehicle to the edit vehicle page. This could possibly be done with
  // having a variable such as editVehiclePressed, which would allow us to essentially swap out the current
  // screen for the edit vehicle page, and then we can also maintain the vehicle selected, as currently
  // we simply navigate to the edit vehicle page

  const [selectedRows, setSelectedRows] = useState([]);
  const [editAlert, setEditAlert] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);

  let navigate = useNavigate();

  const handleAddVehicleClick = () => {
    let path = "/customer/vehicles/add";
    navigate(path);
  };

  const handleEditVehicleClick = () => {
    if (selectedRows.length === 0) {
      setEditAlert(true);
    } else if (selectedRows.length > 1) {
      setEditAlert(true);
    } else {
      let path = `/customer/vehicles/${selectedRows[0]}/edit`;
      navigate(path);
    }
  };

  const handleBackClick = () => {
    let path = "/customer/profile";
    navigate(path);
  };

  const removeVehicle = async (id) => {
    // Delete from database via API
    axios.delete(`users/vehicles/${id}`).then((response) => {
      console.log(response.data);
    });
  };

  const handleRemoveVehicles = () => {
    // API call to remove vehicle
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

  const fetchVehicles = async () => {
    axios.get(`users/vehicles/`).then((response) => {
      console.log(response.data);
      setVehicleList(response.data);
    });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <Box
      style={{
        height: "60vh",
        width: "90%",
        margin: "auto",
        paddingTop: "10px",
      }}
    >
      <CssBaseline />
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h3">Manage Vehicle</Typography>
        </Grid>
        <Grid item xs={4}>
          {editAlert && (
            <Alert severity="error">You must select only one vehicle</Alert>
          )}
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={2}>
          <CustomButton text="Go Back" onClick={handleBackClick} size="large" />
        </Grid>
      </Grid>
      <DataGrid
        rows={vehicleList}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setEditAlert(false);
          setSelectedRows(ids);
        }}
        sx={{
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "10px",
          width: "100%",
        }}
      />

      {/* Bar underneath table, containing add, edit, and remove button */}
      <Box sx={{ height: "10vh" }}>
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
