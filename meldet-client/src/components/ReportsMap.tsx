import { HtmlProps } from "next/dist/shared/lib/utils";
import * as React from "react";
import { useState, useRef } from "react";
import MapGL, { Source, Layer, ViewportProps, MapEvent } from "react-map-gl";
import { config } from "../config";
import { DataContext } from "../lib/context";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "../lib/layers";

const MAPBOX_TOKEN = ""; // Set your mapbox token here

export default function App() {
  const [viewport, setViewport] = useState<ViewportProps>({
    longitude: 3.720367,
    latitude: 51.053075,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });
  const mapRef = useRef<any>(null);

  const handleClick = (event: MapEvent) => {
    try {
          
          const feature = event.features && event.features[0];
          const clusterId: number | undefined = feature && feature.properties.cluster_id;
        
        if (clusterId && mapRef.current !== null){
            const mapboxSource = mapRef.current.getMap().getSource("reports");
            
            mapboxSource.getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
                if (err) {
                    return;
                }
                
                setViewport({
                    ...viewport,
                    longitude: feature.geometry.coordinates[0],
                    latitude: feature.geometry.coordinates[1],
                    zoom,
                    transitionDuration: 500,
                });
            });
        }

        console.log(event.features)
    } catch(err) {
        console.log(err)
        return
    }
  };

  return (
    <DataContext.Consumer>
      {({ filteredReports }) => (
        <>
          <MapGL
            {...viewport}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
            width="100vw"
            height="100vh"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={setViewport}
            mapboxApiAccessToken={config.mapboxToken}
            interactiveLayerIds={[clusterLayer.id || "unclustered-point"]}
            onClick={handleClick}
            ref={mapRef}
          >
            <Source
              id="reports"
              type="geojson"
              data={{
                  type: "FeatureCollection",
                  features: filteredReports.map(report => (
                      {
                          type: "Feature",
                          properties: {
                              ...report
                          },
                          geometry: {
                              type: 'Point',
                              coordinates: [Number(report.lng), Number(report.lat)]
                          }
                    }
                  ))
              }}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          </MapGL>
        </>
      )}
    </DataContext.Consumer>
  );
}
