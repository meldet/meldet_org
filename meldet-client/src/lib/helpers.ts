import prisma from "../../prisma/prisma"


/** 
 * Fetch the latest reports that are added from the database.
 * @param {number} limit
 */
export const fetchReports = async (limit = 5000) => {
    return await prisma.report.findMany({
        orderBy: {createdAt: 'desc'},
        take: limit,
        select: { // leave out createdAt (for privacy), isPrivate and statusChanges
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
            socialMediaConsent: true, 
            title: true,  
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