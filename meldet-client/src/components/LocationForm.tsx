import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "lodash";
import { getPlaceSuggestions } from "../lib/uiDataFetching";
import CircularProgress from "@mui/material/CircularProgress";
import { ReportFormValues } from "../pages/report";
import { useCallback } from "react";

export type Location = Partial<ReportFormValues>

export const randomKey = () => Math.random().toString(36).substring(2, 15)

interface ILocationForm {
  location: Location;
  setLocation: (formValues: Location) => void;
  error: string | undefined
}

export default function LocationForm({location, setLocation, error}: ILocationForm) {

    const [suggestions, setSuggestions] = React.useState<Location[]>([]);
    const [textfieldValue, setTextfieldValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const fetch = useCallback(debounce(async (string: string, active: boolean) => {
      const response = await getPlaceSuggestions(string);
      if (response?.data && response.data.length > 0) {
        
        const mappedAndFiltered = response.data
        // sometimes the data comes back with an array of empty arrays instead of actual results.
        .filter(location => location?.label)
        .map((location) => ({
          ...location,
          address: location.label,
          lat: String(location.latitude),
          lng: String(location.longitude),
          key: randomKey(),
        }))
        setSuggestions(mappedAndFiltered);
        }
      if (!active) {
        console.log('...canceling result')
        return;
      }
      setLoading(false)
    }, 10), []
    );

    React.useEffect(() => {
        let active = true;
        if (textfieldValue.length <= 2) return;
              setLoading(true)
              fetch(textfieldValue, active);   
        return () => {setSuggestions([]), setLoading(false), active=false}
    }, [textfieldValue])



  return (
    <Autocomplete
      value={location}
      onChange={async (e, newValue: string | Location | null) => {
        if (typeof newValue == "string" || !newValue) return;
        setLocation({...newValue});
      }}
      filterOptions={(options, params) => {
        const { inputValue } = params;

        return (inputValue.length >= 3) ? 
        [...options,
          {
            address: inputValue,
            key: randomKey(),
          },
        ] : options
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="location"
      options={suggestions}
      renderOption={(props, option) => <li {...props} key={option.key}>{option.address}</li>}
      getOptionLabel={((suggestion: Location) => suggestion.address || '')}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location*"
          onChange={(e: any) => {
            setTextfieldValue(e.target.value);
          }}
          error={!!error && !location.address}
          helperText={!location.address && error}
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
