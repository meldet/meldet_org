/// app.js
import React, { FunctionComponent } from 'react';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import { Categories, Report } from '../models';
import { createScatterplotLayer } from '../lib/createScatterplotLayer';




// Viewport settings
// focus on Ghent, hardcoded
const INITIAL_VIEW_STATE = {
    longitude: 3.720367,
    latitude: 51.053075, 
    zoom: 13,
    pitch: 0,
    bearing: 0
};

interface Props {
    reports: Report[],
    categories: Categories,
}


const Map: FunctionComponent<Props> = ({reports, categories}) => {
    const mapStyle = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'


  return (
    <div>
        <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[
            createScatterplotLayer(reports, categories),
            // createHeatmapLayer(reports)
        ]}
        >
        <StaticMap reuseMaps mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN } mapStyle={mapStyle} />
        </DeckGL>
    </div>
  );
}

export default Map