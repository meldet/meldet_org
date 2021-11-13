/// app.js
import React, { FunctionComponent } from 'react';
import DeckGL from '@deck.gl/react';
import MapGL from 'react-map-gl';
import {useState} from 'react';
import { Categories, Report } from '../models';
import { createScatterplotLayer } from '../lib/createScatterplotLayer';
import styles from '../styles/Map.module.css'




// Viewport settings
// focus on Gent, hardcoded
const INITIAL_VIEW_STATE = {
    longitude: 3.720367,
    latitude: 51.053075, 
    zoom: 13,
    pitch: 0,
    bearing: 0,
};

interface Props {
    reports: Report[],
    categories: Categories,
}


const Map: FunctionComponent<Props> = ({reports, categories}) => {
    const mapStyle = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'

      const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });


  return (
        <DeckGL
        style={{ height: '100vh', width: '100vw', position: 'relative' }}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[
            createScatterplotLayer(reports, categories),
            // createHeatmapLayer(reports)
        ]}
        >
        <MapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
    />
        </DeckGL>
  );
}

export default Map