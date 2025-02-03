import { brazilAreaCodes } from '@/const/brazil-area-codes'
import { faker } from '@faker-js/faker'

export type PhoneStyle = 'raw' | 'national' | 'international'

type GenerateNumberParams = {
  state: string
  style?: PhoneStyle
}

export class PhoneGenerator {
  private static areaCodes = new Map(
    brazilAreaCodes.flatMap((state) => Object.entries(state)),
  )

  private static getAreaCode(state: string) {
    const areaCodes =
      PhoneGenerator.areaCodes.get(state) ??
      Array.from(PhoneGenerator.areaCodes.values()).flat()

    const areaCode =
      areaCodes.at(Math.round(Math.random() * areaCodes.length - 1)) ?? null

    return areaCode
  }

  static generate({ state, style = 'national' }: GenerateNumberParams) {
    const areaCode = PhoneGenerator.getAreaCode(state)

    if (style === 'raw') {
      const phoneNumber = faker.helpers.fromRegExp(
        `${areaCode}9[1-9]{4}[1-9]{4}`,
      )

      return phoneNumber
    }

    if (style === 'national') {
      const phoneNumber = faker.helpers.fromRegExp(
        `(${areaCode}) 9[1-9]{4}-[1-9]{4}`,
      )

      return phoneNumber
    }

    if (style === 'international') {
      const phoneNumber = faker.helpers.fromRegExp(
        `+55 (${areaCode}) 9[1-9]{4}-[1-9]{4}`,
      )

      return phoneNumber
    }

    throw `Invalid phone number style: ${style}`
  }
}
