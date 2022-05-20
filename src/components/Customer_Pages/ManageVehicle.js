import { Alert, Button, CssBaseline, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../sub-components/CustomButton";

const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'make', headerName: 'Make', flex: 1 },
  { field: 'model', headerName: 'Model', flex: 1 },
  {
    field: 'year',
    headerName: 'Year',
    type: 'number',
    flex: 1,
  },
  {
    field: 'Make and Model',
    headerName: 'Make & Model',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    valueGetter: (params) =>
      `${params.row.make || ''} ${params.row.model || ''}`,
  },
];

let rows = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: 1992 },
  { id: 2, make: 'Mitsubishi', model: 'Pajero', year: 2004 },
  { id: 3, make: 'Nissan', model: 'Skyline', year: 1993 },
  { id: 4, make: 'Volkswagon', model: 'Tureg', year: 2010 },
  { id: 5, make: 'Mercedes', model: 'Benz C-Class', year: 2018 },
  { id: 6, make: 'BMW', model: "m4", year: 2021 },
  { id: 7, make: 'Tesla', model: 'X', year: 2021 },
  { id: 8, make: 'Honda', model: 'Accord', year: 2008 },
  { id: 9, make: 'Volvo', model: '850', year: 1991 },
  { id: 10, make: 'Lexus', model: 'RX300', year: 1996 },
];

const ManageVehicle = () => {

  const [selectedRows, setSelectedRows] = useState([]);
  const [editAlert, setEditAlert] = useState(false)

  let navigate = useNavigate();

  const handleAddVehicleClick = () => {
    let path = '/addVehicle'
    navigate(path)
  }

  const handleEditVehicleClick = () => {
    if(selectedRows.length === 0) {
      setEditAlert(true);
    }else if(selectedRows.length > 1){
      setEditAlert(true);
    }else{
      let path = '/editVehicle'
      navigate(path)
    }
  }

  const handleBackClick = () => {
    let path = '/CustomerProfile'
    navigate(path)
  }

  const handleRemoveVehicles = () => {
    console.log("Rows before filtering:", rows);
    rows = rows.filter((row) => {
      return !selectedRows.includes(row);
    })
    console.log("Rows after filtering:", rows);
  }

  return ( 
  <Box style={{ height: "60vh", width: '90%', margin: "auto", paddingTop: "10px",}}>
    <CssBaseline />
    <Grid container>
      <Grid item xs={3}>
        <Typography variant="h3">Manage Vehicle</Typography>
      </Grid>
      <Grid item xs={4}>
        { editAlert && <Alert severity="error">You must select only one vehicle</Alert>}
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={2}>
        <CustomButton text="Go Back" onClick={handleBackClick} size="large" />
      </Grid>
    </Grid>
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      onSelectionModelChange={(ids) => {
        setEditAlert(false)
        // Get the selected ID's
        const selectedIDs = new Set(ids);
        // Get the actual info from the rows selected
        const selectedRows = rows.filter((row) => selectedIDs.has(row.id),);
        // Set the piece of state with the new selected rows
        setSelectedRows(selectedRows);
      }}
      sx={{
        marginTop: "20px",
        marginLeft: "auto", marginRight: "auto",
        marginBottom: "10px",
        width: "100%",
      }}
    />

    {/* Bar underneath table, containing add, edit, and remove button */}
    <Box
      sx={{ height: "10vh",  }}
    >
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
          <CustomButton text="Add new vehicle" onClick={handleAddVehicleClick} size="large" />
        </Grid>

        {/* Edit button */}
        <Grid item>
          <CustomButton text="Edit a vehicle" onClick={handleEditVehicleClick} size="large" />
        </Grid>

        {/* Remove button */}
        <Grid item>
          <Button 
            fullWidth
            variant="contained"
            color="error"
            size="large"
            onClick={handleRemoveVehicles}
          >Remove a vehicle</Button>
        </Grid>
      </Grid>

    </Box>
  </Box>
  );
}
 
export default ManageVehicle;