/// app.js
import React, { FunctionComponent } from "react";
import DeckGL from "@deck.gl/react";
import MapGL from "react-map-gl";
import { useState } from "react";
import { createScatterplotLayer } from "../lib/createScatterplotLayer";
import { Category, Report } from ".prisma/client";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// Viewport settings center on Gent, hardcoded
// TODO use browser location to set initial viewport
const INITIAL_VIEW_STATE = {
  longitude: 3.720367,
  latitude: 51.053075,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

interface Props {
  reports: Report[];
  categories: Category[];
}

const HandleReportClick = (clickInfo: any) => {};

const Map: FunctionComponent<Props> = ({ reports, categories }) => {
  const mapStyle =
    "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  const [hoverInfo, setHoverInfo] = useState<any>({});

  const handleReportHover = (hoverInfo: any) => {
    setHoverInfo(hoverInfo);
  };

  //TODO put this at higher level or in state management
  const isBigScreen = useMediaQuery("(min-width:600px)");

  return (
    <Box sx={{ position: "relative", height: "80vh", width: "auto" }}>
      <DeckGL
        style={{ height: "100%", width: "100%", position: "absolute" }}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[
          createScatterplotLayer(reports, handleReportHover, HandleReportClick),
          // createHeatmapLayer(reports)
        ]}
      >
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={setViewport}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        />
        {hoverInfo.object && isBigScreen && (
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "white",
              maxWidth: 300,
              padding: 2,
              top: hoverInfo.y,
              left: hoverInfo.x,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6">{hoverInfo.object.title}</Typography>
            <Typography noWrap variant="body2">
              {hoverInfo.object.description}
            </Typography>
          </Box>
        )}
      </DeckGL>
    </Box>
  );
};

export default Map;
