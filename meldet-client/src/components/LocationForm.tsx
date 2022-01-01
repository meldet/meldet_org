import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { throttle } from "lodash";
import { getPlaceSuggestions } from "../lib/geocoding";

export interface Location {
    label: string,
    latitude?: number,
    longitude?: number,
}

interface ILocationForm {
    location: Location
    setLocation: React.Dispatch<React.SetStateAction<Location>>
}

export default function LocationForm({location, setLocation}: ILocationForm) {

    const [suggestions, setSuggestions] = React.useState<Location[]>([]);

    const fetch = throttle(async (string: string) => {
      console.log("querying for ", string);
      const { data, status } = await getPlaceSuggestions(string);
      console.log("fetched: ", status, data);
      status == 200 && data.data && setSuggestions([...data.data]);
    }, 500);


  return (
    <Autocomplete
      value={location}
      onChange={async (e, newValue: string | Location | null) => {
          if (typeof newValue == 'string' || !newValue) return;
          console.log(newValue)
          setLocation(newValue);
      }}
      filterOptions={(options: Location[], params) => {
        const { inputValue } = params;
        const newOptions = [...options]

        if (inputValue.length >= 3) {
          newOptions.push({
            label: `Add "${inputValue}"`,
          });
        }
        return newOptions;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="location"
      options={suggestions}
      getOptionLabel={(suggestion: Location) => suggestion.label}
    //   renderOption={(props, option) => <li {...props}>{option.title}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField 
        {...params} 
        label="Location text field" 
        onChange={async (e: any) => {
          if (e.target.value.length <= 2) return;
          await fetch(e.target.value);
      }}
        />
      )}
    />
  );
}
