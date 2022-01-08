
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
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
  return (
    <UiContext.Consumer>
      {({ filterValues, setFilterValues, isMobile }) => (
        <DataContext.Consumer>
          {({ applyReportsFilter, reports, filteredReports, categories }) => (
            <>
              <Box m={2} minWidth={300} maxWidth={isMobile ? '100%' : 400}>
                <Box>

                <Typography variant="h5">Filter</Typography>
                <TextField
                  margin={"normal"}
                  label="search"
                  variant="outlined"
                  onChange={(e) => {
                    setFilterValues({ ...filterValues, search: e.target.value });
                  }}
                  value={filterValues.search}
                  />

                
                  
                  {/* <Box display={"flex"}>
                    <DatePicker
                    label="From"
                    maxDate={filterValues.to}
                    value={filterValues.from}
                    renderDay={(
                      date: Date,
                      selectedDates: Array<Date | null>,
                      pickersDayProps: PickersDayProps<Date>
                      ) => {
                        const isSelected =
                        isBefore(date, filterValues.to) &&
                        isAfter(date, selectedDates[0] || filterValues.from);
                        return (
                          <PickersDay
                          {...pickersDayProps}
                          disableMargin={isSelected}
                          sx={{
                            borderRadius: 0,
                            background: isSelected ? grey[400] : "none",
                          }}
                          />
                          );
                        }}
                        onChange={(date) => {
                          if (date) {
                            setFilterValues({ ...filterValues, from: date });
                          }
                        }}
                        mask="__.__.____"
                        renderInput={(params) => (
                          <TextField
                          {...params}
                          sx={{ width: 200 }}
                          fullWidth
                          margin="dense"
                          id="filter-from"
                          />
                          )}
                          />
                          <DatePicker
                          label="To"
                          maxDate={new Date()}
                          minDate={filterValues.from}
                          value={filterValues.to}
                          renderDay={(
                            date: Date,
                            selectedDates: Array<Date | null>,
                            pickersDayProps: PickersDayProps<Date>
                            ) => {
                              const isSelected =
                          isAfter(date, filterValues.from) &&
                          isBefore(date, selectedDates[0] || filterValues.to);
                          return (
                            <PickersDay
                            {...pickersDayProps}
                            disableMargin={isSelected}
                            sx={{
                              borderRadius: 0,
                              background: isSelected ? grey[400] : "none",
                            }}
                            />
                            );
                          }}
                          onChange={(date) => {
                            if (date) {
                              setFilterValues({ ...filterValues, to: date });
                            }
                          }}
                          mask="__.__.____"
                          renderInput={(params) => (
                            <TextField
                            {...params}
                            sx={{ width: 200 }}
                            margin="dense"
                            id="filter-from"
                            />
                            )}
                            />
                          </Box> */}
                <Box sx={{ marginTop: 2 }}>
                  <FormControl fullWidth>
                  <InputLabel id="categories-label">Categories</InputLabel>
                  <Select
                  id="categories"
                  labelId="categories-label"
                  label="Categories"
                  multiple
                  input={<OutlinedInput label="categories" />}
                  onChange={(e) => {
                    setFilterValues({
                      ...filterValues,
                      categories: typeof e.target.value == 'string' 
                      ? [e.target.value] : e.target.value,
                    });
                  }}
                  value={filterValues.categories}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
                          <FormHelperText>{filteredReports.length}/{reports.length}</FormHelperText>
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
