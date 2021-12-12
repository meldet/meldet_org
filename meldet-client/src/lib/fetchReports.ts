import prisma from "../../prisma/prisma"


/** 
 * Fetch the latest reports that are added from the database.
 * @param {number} limit
 */
export const fetchReports = async (limit = 5000) => {
    return await prisma.report.findMany({
        orderBy: {createdAt: 'desc'},
        take: limit
    })
}