import prisma from "./prisma";
import mockReports from './reports-seed-data.json'
import mockCategories from './categories-seed-data.json'

const addCategories = async function() {
        const categoriesResult = await prisma.category.createMany({
        skipDuplicates: true,
        data: mockCategories
    })

    console.log('categories added', categoriesResult)
}

const addReports = async function() {
    // insert mock reports 1 by 1, because with createMany you cannot create links to categories as far as I know
    // I know it's not efficient, but it's only seeding data right ;)
    for (let index = 0; index < mockReports.length; index++) {
        const report = mockReports[index];

        const result = await prisma.report.create({
            data: {
                ...report,
                categories: {
                    connect: report.categories?.map(cat => ({
                        id: cat
                    }))
                },
                statusChanges: {
                    create: {status: "RECEIVED"}
                }
            }
        })

        console.log(`inserted record ${index+1}/${mockReports.length}: ${result.title}`)
    }
}


async function main() {
    // insert the categories first to have a link in db!
    await addCategories();
    await addReports();

    // query reports to check if it worked
    const getReports = await prisma.report.findMany({
        include: {
            categories: true,
            _count: true
        },
    })

    console.log(getReports[0]._count)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })