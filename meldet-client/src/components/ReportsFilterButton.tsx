import * as React from "react";
import Popover from "@mui/material/Popover";
import { Badge, Button, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ReportsFilter from "./ReportsFilter";
import { DataContext } from "../lib/context";


export default function ReportsFilterButton() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const togglePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const open = Boolean(anchorEl);
  const id = open ? "reports-filter-popover" : undefined;

  return (
    <DataContext.Consumer>
      {({ applyReportsFilter, reports, filteredReports }) => (
        <>
          <Button
            aria-describedby={id}
            variant={"contained"}
            sx={{ margin: 2 }}
            color="info"
            onClick={togglePopover}
          >
            <Badge
              variant={"dot"}
              // badgeContent={`${filteredReports.length}/${reports.length}`}
              color="warning"
              invisible={reports.length == filteredReports.length}
            >
              <FilterListIcon />
            </Badge>
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{ padding: 2 }}
          >
            <ReportsFilter handleClose={handleClose} />
          </Popover>
        </>
      )}
    </DataContext.Consumer>
  );
}
