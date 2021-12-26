import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Navigation from "../components/Navigation";
import { Grid } from "@mui/material";

export default function Report() {
  return (
    <Grid container flexDirection="column">
      <Navigation />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Report
        </Typography>
      </Box>
    </Grid>
  );
}
