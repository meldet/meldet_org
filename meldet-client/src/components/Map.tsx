import React, { FunctionComponent, useEffect } from "react";
import MapGL, { MapEvent, FlyToInterpolator } from "react-map-gl";
import { useState } from "react";
import { Box } from "@mui/system";
import { config } from "../config";

export interface Viewport {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing?: number;
  transitionDuration?: number;
  transitionInterpolator?: any
  transitionEasing?: any
}

interface Props {
  layers: any[];
  handleMapClick: (evt: MapEvent) => any
  flyToCoord: Partial<Viewport>
}

const Map: FunctionComponent<Props> = ({ handleMapClick, flyToCoord, children }) => {
  
  // Viewport settings center on Gent, hardcoded
  // TODO use browser location to set initial viewport
  const [viewport, setViewport] = useState<Viewport>({
    longitude: 3.720367,
    latitude: 51.053075,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });

  useEffect(() => {
    if (!flyToCoord.latitude && !flyToCoord.longitude) return;
    setViewport({
      ...viewport,
      ...flyToCoord,
      transitionDuration: 500,
      transitionInterpolator: new FlyToInterpolator(),
      // transitionEasing: d3.easeCubic,
    });
  }, [flyToCoord])


  return (
    
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={config.mapboxToken}
        onClick={handleMapClick}
      >
      {children}
      </MapGL>
    
  );
};

export default Map;
