import { DatePicker, PickersDay, PickersDayProps } from "@mui/lab";
import {
  Box,
  Button,
  Chip,
  FormControl,
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
  FilterValues,
  DataContext,
  initialFilterValues,
  UiContext,
} from "../lib/context";
import { isBefore, isAfter } from 'date-fns'
import { grey, red } from "@mui/material/colors";
import { isEqual } from "date-fns/esm";

export default function ReportsFilter({
  handleClose,
}: {
  handleClose: () => void;
}) {
  // local state ... context is too slow for frequent updates
  const [formValues, setFormValues] =
    React.useState<FilterValues>(initialFilterValues);

  const handleChange = (obj: any) => {
    setFormValues({ ...formValues, ...obj });
  };

  const hightlightDaysFrom = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>,
  ) => {
      const isSelected =
        isBefore(date, formValues.to) && isAfter(date, selectedDates[0] || formValues.from);
      return <PickersDay {...pickersDayProps} disableMargin={isSelected} sx={{borderRadius: 0, background: isSelected ? grey[400] : 'none'}} />;
  }
  const hightlightDaysTo = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>,
  ) => {
      const isSelected =
        isAfter(date, formValues.from) && isBefore(date, selectedDates[0] || formValues.to);
      return <PickersDay {...pickersDayProps} disableMargin={isSelected} sx={{borderRadius: 0, background: isSelected ? grey[400] : 'none'}} />;
  }

  
  return (
    <UiContext.Consumer>
      {({ setFilterValues, filterValues }) => (
        <DataContext.Consumer>
          {({ applyReportsFilter, categories }) => (
            <>
              <Box m={2}>
                <Typography variant="h5">Filter</Typography>
                <TextField
                  margin={"normal"}
                  label="search"
                  variant="outlined"
                  onChange={(e) => {
                    handleChange({ search: e.target.value });
                  }}
                  value={formValues.search}
                />

                <FormControl fullWidth>
                  <Box display={"flex"}>
                    <DatePicker
                      label="From"
                      maxDate={formValues.to}
                      value={formValues.from}
                      renderDay={hightlightDaysFrom}
                      onChange={(date) => {
                        if (date) {
                          handleChange({ from: date });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ width: 200 }}
                          margin="dense"
                          id="filter-from"
                        />
                      )}
                    />
                    <DatePicker
                      label="To"
                      maxDate={new Date()}
                      minDate={formValues.from}
                      value={formValues.to}
                      renderDay={hightlightDaysTo}
                      onChange={(date) => {
                        if (date) {
                          handleChange({ to: date });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ width: 200 }}
                          margin="dense"
                          id="filter-from"
                        />
                      )}
                    />
                  </Box>
                </FormControl>
                <FormControl sx={{ marginTop: 2 }}>
                  <InputLabel id="categories-label">Categories</InputLabel>
                  <Select
                    id="categories"
                    labelId="categories-label"
                    label="Categories"
                    multiple
                    input={<OutlinedInput label="categories" />}
                    onChange={(e) => {
                      handleChange({ categories: e.target.value });
                    }}
                    value={formValues.categories}
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
                </FormControl>
              </Box>
              <Box display={"flex"} justifyContent={"flex-end"} m={2}>
                <Button onClick={handleClose}>Cancel</Button>
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
            </>
          )}
        </DataContext.Consumer>
      )}
    </UiContext.Consumer>
  );
}
