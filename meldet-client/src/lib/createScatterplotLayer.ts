import { Report } from ".prisma/client";
// import { ScatterplotLayer } from "@deck.gl/layers";

export function createScatterplotLayer(data: Report[], handleReportHover: (hoverInfo: any) => void, handleReportClick: (clickInfo: any) => void) {
    // return new ScatterplotLayer({
    //     id: 'scatter-plot',
    //     data,
    //     pickable: true,
    //     radiusScale: 3,
    //     radiusMinPixels: 4,
    //     autoHighlight: true,
    //     getPosition: (d: any) => [
    //         // TODO: remove this random offset, this is during development to visualise overlapping points
    //         d.lng + ((Math.random() - 0.5) / 10000), 
    //         d.lat + ((Math.random() - 0.5) / 10000), 
    //         0
    //     ],
    //     getFillColor: [240,0,40, 140],
    //     getRadius: 1,
    //     onClick: (event: any) => {
    //         const report = event.object as Report // casting this to Report because types for deckgl are not setup correctly yet
    //         handleReportClick(report)
    //     },
    //     onHover: handleReportHover,
    // })
}