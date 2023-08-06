export function formatReponse<T>(object: T): T {
  const objectAsString = JSON.stringify(object)
  const objectFormatted = objectAsString.replaceAll('_', '')
  const responseFormatted = JSON.parse(objectFormatted)
  return responseFormatted
}
