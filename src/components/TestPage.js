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
      <ThemeProvider theme={theme}>
        <Button variant="text" color="primary">
          Test
        </Button>
      </ThemeProvider>
    </Box>
    );
}
 



export default TestPage;