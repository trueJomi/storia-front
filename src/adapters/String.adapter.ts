export function transformArraytoString (array: string[]) {
  const string = array.join('\n')
  return string
}
export function transformStringToArray (string: string) {
  const array = string.split('\n')
  return array
}

export function getPromptByRaw (promptRaw: string) {
  const array = promptRaw.split(', perfect face, master piece')
  return array[0]
}
