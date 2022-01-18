
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import {
  DataContext,
  UiContext,
} from "../lib/context";

export default function ReportsFilter({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleCloseSelect = () => {
    setOpen(false);
  };

  const handleOpenSelect = () => {
    setOpen(true);
  };

  return (
    <UiContext.Consumer>
      {({ filterValues, setFilterValues, isMobile }) => (
        <DataContext.Consumer>
          {({ applyReportsFilter, reports, filteredReports, categories }) => (
            <>
              <Box m={2} minWidth={300} maxWidth={isMobile ? "100%" : 400}>
                <Box>
                  <Typography variant="h5">Filter</Typography>
                  <FormControl sx={{marginTop: 2}}>
                  <InputLabel htmlFor="search">
                    search
                  </InputLabel>
                  <OutlinedInput
                    label="search"
                    id="search"
                    type="text"
                    fullWidth
                    endAdornment={
                      filterValues.search && (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="clear input"
                            onClick={() =>
                              setFilterValues({ ...filterValues, search: "" })
                            }
                            edge="end"
                            >
                          <CloseIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                      )
                    }
                    onChange={(e) => {
                      setFilterValues({
                        ...filterValues,
                        search: e.target.value,
                      });
                    }}
                    value={filterValues.search}
                    />
                  </FormControl>
                  <Box sx={{ marginTop: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="categories-label">Categories</InputLabel>
                      <Select
                        id="categories"
                        labelId="categories-label"
                        label="Categories"
                        multiple
                        input={<OutlinedInput label="categories" />}
                        open={open}
                        onOpen={handleOpenSelect}
                        onClose={handleCloseSelect}
                        onChange={(e) => {
                          setOpen(false);
                          setFilterValues({
                            ...filterValues,
                            categories:
                              typeof e.target.value == "string"
                                ? [e.target.value]
                                : e.target.value,
                          });
                        }}
                        value={filterValues.categories}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {categories?.map((category) => (
                          <MenuItem
                            key={category.id}
                            value={category.name}
                            style={{ whiteSpace: "normal", maxWidth: 450 }}
                          >
                            <ListItemText
                              inset
                              primary={category.name.toUpperCase()}
                              secondary={category.description}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {filteredReports.length}/{reports.length}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
                  {/* <Button onClick={handleClose}>Cancel</Button> */}
                  <Button
                    variant="contained"
                    sx={{ marginLeft: 1 }}
                    onClick={() => {
                      applyReportsFilter(filterValues);
                      handleClose();
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </DataContext.Consumer>
      )}
    </UiContext.Consumer>
  );
}
