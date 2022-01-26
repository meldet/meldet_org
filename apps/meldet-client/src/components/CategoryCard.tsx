import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Category } from "@prisma/client";
import { Grid } from "@mui/material";



export default function CategoryCard({description, name}: Category) {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2} m="2">
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Category
        </Typography>
        <Typography variant="h5" component="div">
            {name}
        </Typography>
        <Typography variant="body2">
          {description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Grid>
  );
}
