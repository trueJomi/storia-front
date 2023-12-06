import { type Question } from '../models/Questions.model'

export function fromAnyToQuestion (any: any, id: string): Question {
  const question: Question = {
    id,
    reference: any.reference as number[],
    question: any.question as string,
    response: any.response as string,
    type: any.type as 'literal' | 'inferencial' | 'critico'
  }
  return question
}

export function QuestionsByType (data: Question[] | undefined) {
  if (data === undefined) {
    return {
      literalQuestions: [],
      inferencialQuestions: [],
      criticoQuestions: []
    }
  }
  const literalQuestions = data.filter((item) => item.type === 'literal')
  const inferencialQuestions = data.filter((item) => item.type === 'inferencial')
  const criticoQuestions = data.filter((item) => item.type === 'critico')
  return {
    literalQuestions,
    inferencialQuestions,
    criticoQuestions
  }
}
