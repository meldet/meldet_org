
import _ from "lodash";

interface RawReport {
                date: string, 
                id: string, 
                map_id: string, 
                address: string, 
                description: string, 
                pic: string, 
                link: string, 
                icon: string,
                lat: string,
                lng: string,
                anim: string,
                title: string,
                infoopen: string,
                category: string,
                approved: string,
                retina: string,
                type: string,
                did: string,
                sticky: string,
                other_data: string,
                latlng: string,
}

export interface DatadumpTable {
    data: RawReport[]
}

export interface SeedReport {
        "createdAt": string,
        "incidentDate": string,
        "address": string,
        "lat": string,
        "lng": string,
        "title": string,
        "description": string,
        "isPrivate": boolean,
        "categories": number[]
}

const splitCategory = (catString: string) => {
    const stringArr = catString.split(',').map(str => Number(str)).filter(nr => nr && nr != 0)
    return stringArr
}


export const mapRawDataToSeed = (dataDump: [any, any, DatadumpTable]): SeedReport[] => {
    const nowStr = new Date().toISOString()
    return dataDump[2].data.map(({date, address, lat, lng, title, description, category}) => ({
        createdAt: nowStr,
        incidentDate: date,
        address,
        lat,
        lng,
        title,
        description,
        isPrivate: false,
        categories: splitCategory(category)
    }))
}