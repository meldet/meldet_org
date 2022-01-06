import * as React from "react";
import {
  Drawer,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navigation from "../components/Navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ReportsFilterButton from "../components/ReportsFilterButton";
import { DataContext, FilterValues, UiContext } from "../lib/context";
import Map from "../components/Map";
import { GetStaticProps } from "next";
import { fetchReports, fetchCategories } from "../lib/helpers";
import { Category, Report } from "@prisma/client";


const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface Props {
  categories: Category[]
  reports: Report[]
}
const Index = ({categories, reports}: Props) => {
  
  // opening and closing drawer stuff
  const [open, setOpen] = React.useState<boolean>(false); // TODO this should go in context
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // DataState
  const [filteredReports, setFilteredReports] = React.useState<Report[]>([]);

  const applyReportsFilter = (filterValues: FilterValues) => {
    const filteredValues = [...reports] // ...
    setFilteredReports(filteredValues)
    console.log('new reports are ... ', filteredReports)
  }

  // React.useEffect(() => {
  //   setReports
  // }, [reports])

  return (
    <DataContext.Provider value={{reports, categories, filteredReports, applyReportsFilter}}>
      <UiContext.Consumer>
        {({ isMobile }) => (
          <Grid container flexDirection="column" alignItems={"flex-end"}>
            {/* <Map
            layers={[
              //   createScatterplotLayer(
                //     reports,
                //     handleReportHover,
                //     HandleReportClick
                //   ),
              ]}
            /> */}
            <Navigation />
            <ReportsFilterButton />

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
    </DataContext.Provider>
  );
}

export default Index;

export const getStaticProps: GetStaticProps = async ({}) => {
  const reports = await fetchReports();
  const categories = await fetchCategories();
  
  if (!categories || !reports) {
    return {
      notFound: true,
      revalidate: 60 * 15,
    };
  }

  return {
    props: { categories, reports },
    revalidate: 60 * 15, // rebuild the site every 15 minutes with the latest data
  };
};