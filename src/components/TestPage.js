import { Button } from "@mui/material";
import { Box } from "@mui/system";
// import { createTheme } from "@mui/system";

// const theme = createTheme({
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         textPrimary: {
//           color: "red"
//         }
//       }
//     }
//   }
// })

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