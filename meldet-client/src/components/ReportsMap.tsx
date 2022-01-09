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
import { ReportWithCat } from "../lib/uiDataFetching";

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

  const flyToLoc = (feature: any) => {
    const clusterId: number | undefined =
      feature && feature.properties.cluster_id;

    if (clusterId && mapRef.current !== null) {
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
  };

  interface Feature {
      layer: any
      properties: {
          reportString: string
      }
      state: any
  }

  interface ClusterFeature extends Feature {
    properties: {
        reportString: string
        cluster: boolean
        cluster_id: number
        pointCount: number
    }
  }


  const setSelectedReport = (feature: ClusterFeature, setValues: (v: ReportWithCat[]) => void) => {

        const isCluster = 
        feature.properties?.cluster;

        if (isCluster) {
            
          const geoJsonSource = mapRef.current.getMap().getSource("reports");
          geoJsonSource.getClusterLeaves(
            feature.properties.cluster_id,
            feature.properties.pointCount,
            0,
            (err: any, features: any) => {
                setValues(
                    features.map((feature: Feature) => 
                        JSON.parse(feature.properties.reportString) as ReportWithCat
                    )
                )
            }
          );
        } else {
            // a single feature selected
            const report: ReportWithCat = JSON.parse(feature.properties.reportString);
            setValues([report])
        }
  }

  return (
    <DataContext.Consumer>
      {({ filteredReports, selectedReports, applySelectedReports }) => (
        <>
          <MapGL
            {...viewport}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
            width="100vw"
            height="100vh"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={setViewport}
            mapboxApiAccessToken={config.mapboxToken}
            interactiveLayerIds={["clusters", "unclustered-point"]}
            onClick={(e: MapEvent) => {
                try {
                  const feature: ClusterFeature = e.features && e.features[0];
                  flyToLoc(feature);
                  setSelectedReport(feature, applySelectedReports);
                } catch (err) {
                  console.log(err);
                }
            }}
            ref={mapRef}
          >
            <Source
              id="reports"
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: filteredReports.map((report) => ({
                  type: "Feature",
                  properties: {reportString: JSON.stringify(report)},
                  geometry: {
                    type: "Point",
                    coordinates: [Number(report.lng), Number(report.lat)],
                  },
                })),
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
