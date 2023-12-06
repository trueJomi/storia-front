import { fromAnyToStory, fromAnyToStoryAPI } from '../adapters/Stroy.adapter'
import { API_URL } from '../context/env.context'
import { type Story } from '../models/Stroy.model'
import { deleteData, getCollectionCallbackOrderDate, getData } from './ComonService'

export async function createStory (prompt: string, idToken: string) {
  const response = await fetch(
      `${API_URL}/story/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          id_token: idToken
        })
      }
  )
  const data = await response.json()
  if (response.status > 300) throw Error(data.detail)
  return fromAnyToStoryAPI(data, data.id)
}

export async function createEvaluation (prompt: string, idToken: string) {
  const response = await fetch(
      `${API_URL}/story/evaluation/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          id_token: idToken
        })
      }
  )
  const data = await response.json()
  if (response.status > 300) throw Error(data.detail)
  return fromAnyToStoryAPI(data, data.id)
}

export async function getStory (id: string, uid: string) {
  const data = await getData(id, uid, 'Story')
  if (data.exists()) {
    const resultData = data.data()
    return fromAnyToStory(resultData, data.id)
  } else {
    throw Error('Story not found')
  }
}

export async function getHistorialStory (id: string, fun: (story: Story[]) => void) {
  getCollectionCallbackOrderDate(id, 'Story', (story) => {
    const resultData: Story[] = []
    story.forEach((doc) => {
      const dataTemp = doc.data()
      const data = fromAnyToStory(dataTemp, doc.id)
      resultData.push(data)
    })
    fun(resultData)
  })
}

export async function deleteStory (id: string, uid: string) {
  await deleteData(id, uid, 'Story')
}
