import * as React from "react";
import {
  Drawer,
  Grid,
  IconButton,

  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navigation from "../components/Navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ReportsFilter from "../components/ReportsFilter";
import { GetStaticProps } from "next";
import { fetchCategories, fetchReports } from "../lib/helpers";
import { Report } from ".prisma/client";
import { Category } from "@prisma/client";


const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface IndexProps {
  reports: Report[],
  categories: Category[],
  notFound?: boolean
}

const Index = ({reports, categories, notFound}: IndexProps) => {
  const isMobile = useMediaQuery("(max-width:800px)"); // TODO this should go in context

  const [open, setOpen] = React.useState<boolean>(false); // TODO this should go in context

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid container flexDirection="column" alignItems={"flex-end"}>
      <Navigation></Navigation>
      <ReportsFilter />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "100%" : drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor={isMobile ? "bottom" : "left"}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <div>content container</div>
      </Drawer>
    </Grid>
  );
}

export default Index;

export const getStaticProps: GetStaticProps = async ({

}) => {
  const reports = await fetchReports()
  const categories = await fetchCategories()

  if (!reports || !categories) {
    return {
      notFound: true,
      revalidate: 60 * 15,
    };
  }

  return {
    props: { reports, categories },
    revalidate: 60 * 15, // rebuild the site every 15 minutes with the latest data
  };
}
