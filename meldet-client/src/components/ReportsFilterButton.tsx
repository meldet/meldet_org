import * as React from "react";
import Popover from "@mui/material/Popover";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ReportsFilter from "./ReportsFilter";


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
    <>
      <IconButton aria-describedby={id} onClick={togglePopover}>
        <FilterListIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ padding: 2}}
        >
        <ReportsFilter handleClose={handleClose} />
      </Popover>
        </>
          
  );
}
