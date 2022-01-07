import prisma from "../../prisma/prisma"


/** 
 * Fetch the latest reports that are added from the database.
 * @param {number} limit
 */
export const fetchReports = async (limit = 20) => {
    return await prisma.report.findMany({
        orderBy: {createdAt: 'desc'},
        take: limit,
        select: {
            address: true, 
            categories: {
                select: {
                    id: true,
                    name: true,
                }
            }, 
            description: true, 
            id: true, 
            incidentDate: true, 
            lat: true,
            lng: true,
            title: true,  
            socialMediaConsent: false, // we don't need this for the client-facing app
            createdAt: false, // filter out for privacy reasons
            isPrivate: false, // is filtered out above
            statusChanges: false, // Not relevant
        }
    })
}

/** 
 * Fetch the categories from the database.
 */
export const fetchCategories = async () => {
    return await prisma.category.findMany({
        orderBy: {name: 'asc'}
    })
}