import { colors } from "@mui/material";
import { LayerProps } from "react-map-gl";


export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "reports",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      colors.lightBlue[200],
      20, colors.lightBlue[600],
      100, colors.lightBlue[900],
    ],
    "circle-radius": [
      "step", ["get", "point_count"], 18, 20, 26, 100, 35],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "reports",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
  paint: {}
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "reports",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": colors.lightBlue[200],
    "circle-radius": 8,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};
