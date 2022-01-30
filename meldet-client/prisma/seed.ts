import prisma from "./prisma";
import mockReports from './reports-seed-data.json'
import mockCategories from './categories-seed-data.json'
import { getPlaceSuggestions, getReverseGeocoding } from "../src/lib/uiDataFetching";
import { mapRawDataToSeed } from "./mapRawDataToSeed";

const addCategories = async function() {
        const categoriesResult = await prisma.category.createMany({
        skipDuplicates: true,
        data: mockCategories
    })

    console.log('categories added', categoriesResult)
}

const addReports = async function (options: {
  enhanceLocation?: boolean;
  enhanceIncidentDate?: boolean;
  rawDataPath?: string;
}) {
  const defaultOptions = {
    enhanceLocation: false,
    enhanceIncidentDate: false,
    rawDataPath: './rawData.json',
  };

  const { enhanceLocation, enhanceIncidentDate, rawDataPath } = {
    ...defaultOptions,
    ...options,
  };
  const data = rawDataPath ? mapRawDataToSeed(require(`${rawDataPath}`)) : mockReports
  console.log(data);

  // insert mock reports 1 by 1, because with createMany you cannot create links to categories as far as I know
  // I know it's not efficient, but it's only seeding data right ;)
  for (let index = 0; index < data.length; index++) {
    const report = data[index];
    const { lat, lng, address } = report;

    if (enhanceLocation) {
      // add address if coordinates are there but address is missing
      if (lat && lng && !address) {
        const response = await getReverseGeocoding(Number(lat), Number(lng));
        report.address = response?.label || "";
      }
      // add coordinates from address if they are missing
      if (address && !lat && !lng) {
        const response = await getPlaceSuggestions(address);
        report.lat = String(response?.data[0].latitude);
        report.lng = String(response?.data[0].longitude);
      }
    }

    const result = await prisma.report.create({
      data: {
        ...report,
        categories: {
          connect: report.categories?.map((cat) => ({
            id: cat,
          })),
        },
        statusChanges: {
          create: { status: "RECEIVED" },
        },
      },
    });

    console.log(
      `inserted record ${index + 1}/${data.length}: ${result.title}`
    );
  }
};


async function main() {
    // insert the categories first to have a link in db!
    await addCategories();
    await addReports({enhanceLocation: true, rawDataPath: './meldet_wordpress_datadump_22_jan.json'});

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