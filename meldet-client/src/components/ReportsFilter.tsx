
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
  styled,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import {
  DataContext,
  initialFilterValues,
  IsMobileContext,
  UiContext,
} from "../lib/context";
import { reportsFilter } from "../lib/reportsFilter";

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

  const {isMobile} = React.useContext(IsMobileContext)


  return (
    <UiContext.Consumer>
      {({ filterValues, setFilterValues }) => (
        <DataContext.Consumer>
          {({ applyReportsFilter, reports, categories }) => (
            <form
              onSubmit={(e: any) => {
                console.log(e);
                e.preventDefault();
                applyReportsFilter(filterValues);
                handleClose();
              }}
            >
              <Box m={2} minWidth={300} maxWidth={isMobile ? "100%" : 400}>
                <Box>
                  <Typography variant="h5">filter</Typography>
                  <FormControl sx={{ marginTop: 2 }}>
                    <InputLabel htmlFor="search">search</InputLabel>
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
                        {reportsFilter(reports, filterValues).length}/
                        {reports.length}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                  <ClearAllButton
                    size="small"
                    onClick={() => setFilterValues(initialFilterValues)}
                  >
                    clear all
                  </ClearAllButton>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginLeft: 1 }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </DataContext.Consumer>
      )}
    </UiContext.Consumer>
  );
}



const ClearAllButton = styled(Button)({
  textTransform: 'none',
})