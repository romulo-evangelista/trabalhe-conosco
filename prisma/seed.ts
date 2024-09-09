import { Crop, Farmer, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const validDocuments = [
  // CNPJ
  '43.595.450/0001-87',
  '70.215.896/0001-01',
  '50.761.835/0001-32',
  '83.721.280/0001-54',
  '85.958.416/0001-70',
  // CPF
  '925.784.570-26',
  '135.722.290-49',
  '758.528.040-88',
  '128.124.300-01',
  '560.014.720-17',
];

async function main() {
  const data: Farmer[] = [];

  for (let i = 0; i < 10; i++) {
    const rand = Math.floor(Math.random() * Object.keys(Crop).length);
    const randCropValue = Crop[Object.keys(Crop)[rand]];

    data.push({
      id: undefined,
      documentNumber: validDocuments[i],
      name: faker.person.fullName(),
      farmName: faker.company.name(),
      city: faker.location.city(),
      state: faker.location.state(),
      totalArea: 100,
      arableTotalArea: 20,
      vegetationArea: 40,
      crops: [randCropValue],
    });
  }

  await prisma.farmer.createMany({ data });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
