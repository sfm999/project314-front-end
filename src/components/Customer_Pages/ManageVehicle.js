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
  const { userID } = useAuth();
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
    axios.get(`users/vehicles/?user=${userID}`).then((response) => {
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
