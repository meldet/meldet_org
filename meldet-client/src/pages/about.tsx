import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../components/Link";
import { Grid } from "@mui/material";
import Navigation from "../components/Navigation";

export default function About() {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Grid container flexDirection="column">
      <Navigation />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Meldet
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the main page
        </Button>
      </Box>
    </Grid>
  );
}
