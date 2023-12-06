export interface Question {
  id?: string
  reference: number[]
  question: string
  response: string
  type: 'literal' | 'inferencial' | 'critico'
}
