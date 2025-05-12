import { faker } from "@faker-js/faker";

export const specialtyFixture = {
  uniqueName: `${faker.commerce.department()} ${faker.string.alpha()}`,
};
