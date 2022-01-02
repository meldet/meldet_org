import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { throttle } from "lodash";
import { getPlaceSuggestions } from "../lib/geocoding";
import CircularProgress from "@mui/material/CircularProgress";

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
    const [textfieldValue, setTextfieldValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const fetch = throttle(async (string: string) => {
      console.log("querying for ", string);
      const { data, status } = await getPlaceSuggestions(string);
      console.log("fetched: ", status, data);
      status == 200 && data.data && setSuggestions([...data.data]);
      setLoading(false)
    }, 500);

    React.useEffect(() => {
        if (textfieldValue.length <= 2) return;
                setLoading(true)
               fetch(textfieldValue);   
        return () => {setSuggestions([])}
    }, [textfieldValue])



  return (
    <Autocomplete
      value={location}
      onChange={async (e, newValue: string | Location | null) => {
        if (typeof newValue == "string" || !newValue) return;
        console.log(newValue);
        setLocation(newValue);
      }}
      filterOptions={(options: Location[], params) => {
        const { inputValue } = params;
        const newOptions = [...options];

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
          label="Location"
          onChange={(e: any) => {
            setTextfieldValue(e.target.value);
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
