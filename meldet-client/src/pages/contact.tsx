import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Navigation from "../components/Navigation";

export default function Contact() {
  return (
    <Grid container flexDirection="column">
      <Navigation />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact us
        </Typography>
      </Box>
    </Grid>
  );
}
