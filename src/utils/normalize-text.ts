export function normalizeText(text: string) {
  return (
    text
      .normalize('NFD')
      // biome-ignore lint/suspicious/noMisleadingCharacterClass: there is no misleading character class
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  )
}
