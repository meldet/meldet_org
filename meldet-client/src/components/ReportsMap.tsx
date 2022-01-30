import * as React from "react";
import {  useRef } from "react";
import { Source, Layer, MapEvent, FlyToInterpolator } from "react-map-gl";
import { DataContext, UiContext } from "../lib/context";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "../lib/layers";
import { ReportWithCat } from "../lib/uiDataFetching";
import Map, { Viewport } from "./Map";


export default function ReportsMap() {
  const { viewport, setUiState, filterValues } = React.useContext(UiContext);

    const setViewport = (newviewport: Partial<Viewport>) => {
      setUiState({
        filterValues,
        viewport: {
          ...viewport,
          ...newviewport,
        },
      });
    };

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
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          zoom,
          transitionDuration: 500,
          transitionInterpolator: new FlyToInterpolator(),
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
        feature?.properties?.cluster;

        if (isCluster) {
          const geoJsonSource = mapRef.current.getMap().getSource("reports");
          geoJsonSource.getClusterLeaves(
            feature.properties.cluster_id,
            100, // limit of the amount of reports to fetch. Higher slows down performance
            0, // offset -> could be used for pagination
            (err: any, features: any) => {
                setValues(
                    features.map((feature: Feature) => 
                        JSON.parse(feature.properties.reportString) as ReportWithCat
                    )
                )
            }
          );
        } else if (feature?.properties) {
            // a single feature selected
            const report: ReportWithCat = JSON.parse(feature.properties.reportString);
            setValues([report])
        }
  }

  return (
    <DataContext.Consumer>
      {({ filteredReports, applySelectedReports }) => (
        <>
          <Map
            style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
            width="100vw"
            height="100vh"
            interactiveLayerIds={["clusters", "unclustered-point"]}
            handleMapClick={(e: MapEvent) => {
                try {
                  const feature: ClusterFeature = e.features && e.features[0];
                  setSelectedReport(feature, applySelectedReports);
                  flyToLoc(feature);
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
          </Map>
        </>
      )}
    </DataContext.Consumer>
  );
}
