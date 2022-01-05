import * as React from "react";
import { Box, Grid } from "@mui/material";
import Map, { Viewport } from "./Map";
import { ReportFormValues } from "../pages/report";
import { getReverseGeocoding } from "../lib/geocoding";
import { MapEvent, Marker } from "react-map-gl";
import Pin from '../lib/Pin'

export interface IReportMapPicker {
  formState: ReportFormValues;
  handleFormSubmit: (formValues: Partial<ReportFormValues>) => void;
  // handleStepChange: (step: ReportSteps) => void;
}

const iconSize = 30;

export default function ReportMapPicker({formState, handleFormSubmit}: IReportMapPicker) {
  
  const [flyToCoord, setFlyToCoord] = React.useState<Partial<Viewport>>({})
  


  React.useEffect(() => {
      setFlyToCoord({latitude: Number(formState.lat), longitude: Number(formState.lng)})
  }, [formState.lat, formState.lng])

  const handleMapClick = async (evt: MapEvent) => {
    if(evt.lngLat) {
    const [lng, lat] = evt.lngLat;
    handleFormSubmit({
      lng: String(lng),
      lat: String(lat),
    });
    const response = await getReverseGeocoding(lat, lng);
    
      if (response) {
        handleFormSubmit({
          address: response.label,
          lng: String(lng),
          lat: String(lat),
        })
      }
    } 
  }


  return (
    <Grid item xs={12} md={8} sx={{minHeight: 400}}>
      {/* <Box sx={{ position: "relative", height: "400px", width: "auto" }}> */}
      <Map layers={[]} handleMapClick={handleMapClick} flyToCoord={flyToCoord}>
        {formState.lat && formState.lng && (
          <Marker
            key="marker"
            longitude={Number(formState.lng)}
            latitude={Number(formState.lat)}
            offsetTop={Number(`-${iconSize}`)}
            offsetLeft={Number(`-${iconSize / 2}`)}
          >
            <Pin size={iconSize} />
          </Marker>
        )}
      </Map>
        {/* </Box> */}
    </Grid>
  );
}
