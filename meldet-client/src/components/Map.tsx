/* eslint-disable react/display-name */
import React, { useContext, useEffect } from "react";
import MapGL, { MapEvent, FlyToInterpolator } from "react-map-gl";
import { config } from "../config";
import { UiContext } from "../lib/context";

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
  children: any,
  handleMapClick: (evt: MapEvent) => any
  interactiveLayerIds?: string[]
  ref?: any
  style?: any
  width?: string
  height?: string
}

const Map = React.forwardRef<any, Props>((props, ref) => {

  const { handleMapClick, children, interactiveLayerIds = [], style={}, width = '100%', height = '100%' } = props


  const {viewport, setViewport} = useContext(UiContext)


  return (

        <MapGL
        {...viewport}
        width={width}
        height={height}
        style={style}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={config.mapboxToken}
        onClick={handleMapClick}
        interactiveLayerIds={interactiveLayerIds}
        ref={ref}
        >
      {children}
    </MapGL>
  );
});

export default Map;
