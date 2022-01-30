import * as React from "react";
import Popover from "@mui/material/Popover";
import { Badge } from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ReportsFilter from "./ReportsFilter";
import { DataContext } from "../lib/context";
import MapOptionsButton from "./MapOptionsButton";

export default function FlyToButton() {
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
            sx={{ margin: 1 }}
            color="primary"
            onClick={togglePopover}
          >
            <LocationSearchingIcon />
          </MapOptionsButton>
        </>
      )}
    </DataContext.Consumer>
  );
}
