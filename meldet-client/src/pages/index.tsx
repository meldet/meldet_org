import * as React from "react";
import {
  Drawer,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navigation from "../components/Navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ReportsFilter from "../components/ReportsFilter";
import { UiContext } from "../lib/context";


const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


const Index = () => {

  const [open, setOpen] = React.useState<boolean>(false); // TODO this should go in context

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <UiContext.Consumer>
      {({ isMobile }) => (
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
      )}
    </UiContext.Consumer>
  );
}

export default Index;

// export const getStaticProps: GetStaticProps = async ({}) => {
//   const reports = await fetchReports();
//   const categories = await fetchCategories();

//   if (!reports || !categories) {
//     return {
//       notFound: true,
//       revalidate: 60 * 15,
//     };
//   }

//   return {
//     props: { reports, categories },
//     revalidate: 60 * 15, // rebuild the site every 15 minutes with the latest data
//   };
// };