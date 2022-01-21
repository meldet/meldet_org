import { createTheme } from '@mui/material/styles';
import { lightBlue, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      // main: "#556cd6",
      main: lightBlue[900],
      light: lightBlue[700],
    },
    secondary: {
      main: "#000",
    },
    error: {
      main: red.A400,
    },
    
  },
});

export default theme