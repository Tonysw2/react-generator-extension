import { brazilAreaCodes } from '@/const/brazil-area-codes'

export class PhoneGenerator {
  private value: string | null = null
  private areaCode: number | null = null
  private areaCodes: Map<string, number[]>

  constructor() {
    this.areaCodes = new Map(
      brazilAreaCodes.flatMap((state) => Object.entries(state)),
    )
  }

  private getAreaCode(state: string) {
    const areaCodes =
      this.areaCodes.get(state) ?? Array.from(this.areaCodes.values()).flat()

    this.areaCode =
      areaCodes.at(Math.round(Math.random() * areaCodes.length - 1)) ?? null

    return this.areaCode
  }

  generate(state?: string) {
    const digits = 8

    const min = Math.pow(10, digits - 1)
    const max = Math.pow(10, digits) - 1

    const number = Math.floor(Math.random() * (max - min + 1) + min)
      .toString()
      .padStart(9, '9')

    const areaCode = this.getAreaCode(state ?? '')

    const phoneNumber = `${areaCode}${number}`

    this.value = phoneNumber
  }

  getRaw() {
    if (!this.value) {
      throw 'You must generate a number before'
    }

    return this.value
  }

  getFormatted() {
    if (!this.value) {
      throw 'You must generate a number before'
    }

    return `(${this.value.slice(0, 2)}) ${this.value.slice(2, 7)}-${this.value.slice(7)}`
  }
}
