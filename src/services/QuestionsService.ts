import { fromAnyToQuestion } from '../adapters/Question.adapter'
import { API_URL } from '../context/env.context'
import { type Question } from '../models/Questions.model'
import { type FormQuestion } from '../models/utils/FormQuestion'
import { deleteData, getCollectionCallback } from './ComonService'

export async function generateQuestions (form: FormQuestion) {
  const response = await fetch(
        `${API_URL}/question/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        }
  )
  const data = await response.json()
  if (response.status > 300) throw Error(data.detail)
  const questions = data as Question[]
  return questions
}

export async function generateQuestionsEvaluate (idToken: string, id: string) {
  const response = await fetch(
        `${API_URL}/question/evaluation/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_token: idToken,
            id
          })
        }
  )
  const data = await response.json()
  if (response.status > 300) throw Error(data.detail)
  const questions = data as Question[]
  return questions
}

export async function getQuestions (id: string, uid: string, fun: (questions: Question[]) => void) {
  getCollectionCallback(id, `Story/${uid}/Question`, (docs) => {
    const resultData: Question[] = []
    docs.forEach((doc) => {
      const dataTemp = doc.data()
      const data = fromAnyToQuestion(dataTemp, doc.id)
      resultData.push(data)
    })
    fun(resultData)
  })
}

export async function deleteQuestion (id: string, uid: string, questionId: string) {
  await deleteData(id, questionId, `Story/${uid}/Question`)
}
