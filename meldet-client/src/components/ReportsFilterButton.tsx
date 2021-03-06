import * as React from "react";
import Popover from "@mui/material/Popover";
import { Badge} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ReportsFilter from "./ReportsFilter";
import { DataContext } from "../lib/context";
import MapOptionsButton from "./MapOptionsButton";


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
      {({ reports, filteredReports }) => (
        <>
          <MapOptionsButton
            aria-describedby={id}
            variant={"outlined"}
            sx={{ margin: 1, }}
            color="primary"
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
          </MapOptionsButton>

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


