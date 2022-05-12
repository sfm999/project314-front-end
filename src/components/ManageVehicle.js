import { Button, ButtonGroup, Card, Container, CssBaseline, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

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

const rows = [
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

  let navigate = useNavigate();

  const handleAddVehicleClick = () => {
    let path = '/addVehicle'
    navigate(path)
  }

  const handleEditVehicleClick = () => {
    let path = '/editVehicle'
    navigate(path)
  }

  return ( 
  <Box style={{ height: "60vh", width: '90%', margin: "auto", paddingTop: "10px",}}>
    <CssBaseline />
    <Typography
      variant="h3"
    >
      Manage Vehicle
    </Typography>
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      sx={{
        marginTop: "20px",
        marginLeft: "auto", marginRight: "auto",
        marginBottom: "10px",
        width: "100%",
      }}
    />
    <Box
      sx={{ height: "10vh",  }}
    >
      <Grid
      container
      justifyContent="space-evenly"
      sx={{
        marginBottom: "10px",
      }}
      >
        <Grid item>
          <Button 
            fullWidth
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
            onClick={handleAddVehicleClick}
          >Add new vehicle</Button>
        </Grid>
        <Grid item>
          <Button 
              fullWidth
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
              onClick={handleEditVehicleClick}
            >Edit a vehicle</Button>
        </Grid>
        <Grid item>
          <Button 
            fullWidth
            variant="contained"
            color="error"
            size="large"
          >Remove a vehicle</Button>
        </Grid>
      </Grid>

    </Box>
  </Box>
  );
}
 
export default ManageVehicle;