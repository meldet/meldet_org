import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../components/Link";
import { Grid, Paper } from "@mui/material";
import Navigation from "../components/Navigation";
import CategoryCard from "../components/CategoryCard";
import { fetchCategories } from "../lib/helpers";
import { GetStaticProps } from "next";
import { Category } from "@prisma/client";


interface Props {
  categories: Category[]
}

export default function About({ categories }: Props) {
  return (
    <Grid container flexDirection="column">
      <Navigation />
      <Grid item container>
        <Box sx={{ my: 4 }}>
          <Grid item xs={12} md={6} m={2}>
            <Paper sx={{ padding: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                About Meldet
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                meldet.org is a Gent-based (Belgium) independent organization
                fighting harassment. we want to map different kinds of
                harassment (see categories) to uncover the extent of the
                problem. the goal is to give a voice to everyone who has ever
                been harassed, to stop the silence.
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                harassment is street harassment, harassment at work, in private,
                anywhere. report anything you have experienced or anything you
                have seen.
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                join us and report your case, or whatever you have seen. report
                completely anonymous and without registering.
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                click on the map and choose your category, confirm you are human
                and submit your marker.
              </Typography>
              <Typography variant="body1" marginBottom={2}>
                check out the feedback page if you have any remarks.
              </Typography>
              <Button variant="contained" component={Link} noLinkStyle href="/">
                Go to map
              </Button>
            </Paper>
          </Grid>
        </Box>

        <Grid item container xs={12} spacing={2} m={2}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}


export const getStaticProps: GetStaticProps = async ({}) => {
  const categories = await fetchCategories();

  if (!categories) {
    return {
      notFound: true,
    };
  }

  return {
    props: { categories },
  };
};
