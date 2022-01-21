import * as React from "react";
import {
  Drawer,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navigation from "../components/Navigation";
import CloseIcon from "@mui/icons-material/Close";
import ReportsFilterButton from "../components/ReportsFilterButton";
import { DataContext, FilterValues, initialFilterValues, IsMobileContext, UiContext } from "../lib/context";
import { GetStaticProps } from "next";
import { fetchReports, fetchCategories } from "../lib/helpers";
import { Category } from "@prisma/client";
import { reportsFilter } from "../lib/reportsFilter";
import { ReportWithCat } from "../lib/uiDataFetching";
import ReportsMap from "../components/ReportsMap";
import Report from "../components/Report";
import FlyToButton from "../components/FlyToButton";


const drawerWidth = 350;

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
  reports: ReportWithCat[]
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
  // const [reports, setReports] = React.useState<ReportWithCat[]>([]);
  const [filteredReports, setFilteredReports] = React.useState<ReportWithCat[]>([]);
  const [selectedReports, setSelectedReports] = React.useState<ReportWithCat[]>([]);

  React.useEffect(() => {
    applyReportsFilter(initialFilterValues)
  }, [])

  const applyReportsFilter = (filterValues: FilterValues) => {
    setFilteredReports(
      [...reportsFilter(reports, filterValues)]
    );
  }

  const applySelectedReports = (reports: ReportWithCat[]) => {
    setSelectedReports(reports);
    reports.length > 0 ? handleDrawerOpen() : handleDrawerClose()
  }

    const {isMobile} = React.useContext(IsMobileContext)

  return (
    <DataContext.Provider value={{reports, categories, filteredReports, applyReportsFilter, selectedReports, applySelectedReports}}>

          <Grid container flexDirection="column" alignItems={"flex-end"}>

            <ReportsMap />
            <Navigation />
            <ReportsFilterButton />
            <FlyToButton />

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
                  <CloseIcon />
                </IconButton>
              </DrawerHeader>
              {
                selectedReports.map(report => (
                  <Report key={report.id} {...report} />
                ))
              }
              {/* <Report {...selectedReports[0]} /> */}
            </Drawer>
          </Grid>
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