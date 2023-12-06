export function obtainForIndex (data: string[], indexs: number[]) {
  const result: string[] = []
  indexs.forEach(index => {
    result.push(data[index])
  })
  return result
}
