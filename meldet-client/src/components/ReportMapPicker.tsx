import * as React from "react";
import { Grid } from "@mui/material";
import Map from "./Map";
import { ReportFormValues } from "../pages/report";
import { getReverseGeocoding } from "../lib/uiDataFetching";
import { FlyToInterpolator, MapEvent, Marker } from "react-map-gl";
import Pin from "../lib/Pin";
import { UiContext } from "../lib/context";

export interface IReportMapPicker {
  formState: ReportFormValues;
  handleFormSubmit: (formValues: Partial<ReportFormValues>) => void;
}

const iconSize = 30;

export default function ReportMapPicker({
  formState,
  handleFormSubmit,
}: IReportMapPicker) {
  const { setUiState, viewport, filterValues } = React.useContext(UiContext);
  React.useEffect(() => {
    // do this to prevent jump to 0, 0 on initial load
    if (Number(formState.lat) == 0 && Number(formState.lng) == 0) return;
    setUiState({
      filterValues,
      viewport: {
        ...viewport,
        latitude: Number(formState.lat),
        longitude: Number(formState.lng),
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
      }
    });
  }, [formState.lat, formState.lng]);

  const handleMapClick = async (evt: MapEvent) => {
    if (evt.lngLat) {
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
        });
      }
    }
  };

  return (
    <Grid item xs={12} md={8} sx={{ minHeight: 400 }}>
      <Map handleMapClick={handleMapClick}>
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
    </Grid>
  );
}
