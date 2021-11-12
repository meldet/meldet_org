import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import { Report } from '../models';

export function createHeatmapLayer(data: Report[]) {
    return new HeatmapLayer({
        id: 'heatmap-layer',
        data,
        opacity: 0.5,
        getPosition: (d: any) => [
            // TODO: remove this random offset, this is during development to visualise overlapping points
            d.lng + ((Math.random() - 0.5) / 10000), 
            d.lat + ((Math.random() - 0.5) / 10000), 
            0
        ],
    //   updateTriggers: {
    //     getFillColor: [maleColor, femaleColor]
    //   }
    })
}