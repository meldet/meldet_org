import { ScatterplotLayer } from "@deck.gl/layers";
import { Categories, Report } from "../models";

export function createScatterplotLayer(data: Report[], categories: Categories) {
    return new ScatterplotLayer({
        id: 'scatter-plot',
        data,
        radiusScale: 3,
        radiusMinPixels: 3,
        opacity: 0.5,
        getPosition: (d: any) => [
            // TODO: remove this random offset, this is during development to visualise overlapping points
            d.lng + ((Math.random() - 0.5) / 10000), 
            d.lat + ((Math.random() - 0.5) / 10000), 
            0
        ],
        getFillColor: (report: any) => categories[report.categoryId]?.visualisationColor || [240,0,40],
        getRadius: 1,
    //   updateTriggers: {
    //     getFillColor: [maleColor, femaleColor]
    //   }
    })
}