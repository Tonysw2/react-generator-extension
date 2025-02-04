import { fakerPT_BR as faker } from '@faker-js/faker'

export class AddressGenerator {
  static generate() {
    return {
      zipCode: faker.location.zipCode(),
      state: faker.location.state({ abbreviated: true }),
      city: faker.location.city(),
      street: faker.location.street(),
      number: faker.number.int({ min: 1, max: 999 }).toString(),
    }
  }
}
