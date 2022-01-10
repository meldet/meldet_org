import prisma from "../../prisma/prisma"

const randomOffset = () => (Math.random() - 0.5) / 20000;
/** 
 * Fetch the latest reports that are added from the database.
 * @param {number} limit
 */
export const fetchReports = async (limit = 5000) => {
    const response = await prisma.report.findMany({
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
    prisma.$disconnect()
    return response.map((report) => ({
      ...report,
      // put a random offset on the location to 
      // 1. give a bit of privacy 
      // 2. make sure not all dots on the same address overlap
      lat: String(Number(report.lat) + randomOffset()),
      lng: String(Number(report.lng) + randomOffset()),
    }));
}

/** 
 * Fetch the categories from the database.
 */
export const fetchCategories = async () => {
    const response = await prisma.category.findMany({
        orderBy: {name: 'asc'}
    })
    prisma.$disconnect()
    return response
}