export interface FormQuestion {
  id_token: string
  id: string
  type: 'literal' | 'inferencial' | 'critico'
  paragrafth: number[]
  cantidad: number
}
