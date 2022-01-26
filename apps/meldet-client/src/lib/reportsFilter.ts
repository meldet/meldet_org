import { Category } from "@prisma/client";
import { FilterValues } from "./context";
import { ReportWithCat } from "./uiDataFetching";

export const reportsFilter = (reports: ReportWithCat[], fv: FilterValues) => {
    const result = reports.filter(rep => 
        // filter.from(rep, fv) 
        // && filter.to(rep, fv)
        filter.categories(rep, fv) 
        && filter.search(rep, fv)
    )
    return result
}


const filter = {
    // from: (r: ReportWithCat, f: FilterValues) => {
    //     console.log('reportWithCat without incident date', !r.incidentDate || isValidDate(r.incidentDate)); 
    //     if (!r.incidentDate || !isValidDate(r.incidentDate)) {
    //         return false
    //     }
    //     return r.incidentDate && f.from.getTime() <= new Date(r.incidentDate).getTime()
    // },
    // to: (r: ReportWithCat, f: FilterValues) => r.incidentDate && f.to.getTime() > new Date(r.incidentDate).getTime(),
    categories: (r: ReportWithCat, f: FilterValues) => {
        if (!r.categories || f.categories.length == 0) return true
        return hasSameValue(r.categories, f.categories)
    },
    search: (r: ReportWithCat, f: FilterValues) => {
        if (f.search.length == 0) return true
        const pattern = new RegExp(f.search, "i")
        return pattern.test(r.title) || pattern.test(r.address) || pattern.test(r.description)
    }
}

const hasSameValue = (arr1: Category[], arr2: string[]) => {
    return !!arr1.some(cat => 
        arr2.some(name => name == cat.name) 
    )
}



