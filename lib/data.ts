import { readFileSync } from "fs";
import path from "path";
import { Categories, InputResults } from "../models";

const folder = path.join(process.cwd() , 'staticData')


function parseJsonFileAsString(folder: string, fileName: string): any {
    const dataPath = path.join(folder, fileName)
    const file = readFileSync(dataPath, 'utf8')
    return JSON.parse(file)
}

export function getStaticReports()  {
    const data: InputResults = parseJsonFileAsString(folder, 'meldetorg.2021-11-09.json')

    return data.markers.map(({id, address, lat, lng, title, description, category}) => ({
        id,
        address,
        lat: Number(lat),
        lng: Number(lng),
        title,
        description,
        categoryId: category
    }))
}

export function getStaticCategories() {
    const data: Categories = parseJsonFileAsString(folder, 'categories.json')
    return data
}

