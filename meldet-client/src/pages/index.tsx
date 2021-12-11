import * as React from "react";
import Box from "@mui/material/Box";
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


const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));



export default function Index() {
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
