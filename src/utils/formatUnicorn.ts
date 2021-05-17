/**
 * This is a beautiful string manipulation function
 * inspired by the stackoverflow formatUnicorn.
 * It enables string subbing using curly braces as the delimiter.
 * @param {string} data The translation key.
 * @param {Object} values The values to substitute in the string
 * @returns {string}
 *
 * @example: formatUnicorn("Hi {name}!", { name: "George" }) // 'Hi George!'
 */
export default function formatUnicorn(
  data: string | any,
  values?: Record<string, any>
): string {
  try {
    if (!values || typeof data !== 'string') {
      return data
    }

    let string = data
    for (const value in values) {
      const valueRegExp = new RegExp(`{${value}}`, 'gi')
      string = string.replace(valueRegExp, values[value])
    }

    return string
  } catch (e) {
    return data
  }
}
