import { Button } from "@mui/material";
import { Box, createTheme, ThemeProvider } from "@mui/system";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        textPrimary: {
          color: "red"
        }
      }
    }
  }
})

const TestPage = () => {
  return (
    <Box
      height="87vh"
      bgcolor="lightblue"
    >
      <Button variant="text" color="primary">
        Test
      </Button>

    </Box>
    );
}
 



export default TestPage;