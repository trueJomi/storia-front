/* eslint-disable quote-props */
import { API_URL } from '../context/env.context'
import { type Image } from '../models/Image.model'
import { type Images } from '../models/Stroy.model'
import { updateData } from './ComonService'

export async function updateImages (id: string, images: Images, uid: string) {
  await updateData(id, 'Story', {
    'images': {
      ...images
    }
  }, uid)
}

export async function generateImage (prompt: string, idToken: string): Promise<Image> {
  const response = await fetch(
    `${API_URL}/images/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://cuentos-ai.web.app'
      },
      body: JSON.stringify({
        prompt,
        id_token: idToken
      })
    }
  )
  const data = await response.json()
  if (response.status > 300) throw Error(data.detail)
  return data as Image
}

export async function generateImages3 (id: string, idToken: string): Promise<Images> {
  const response = await fetch(
    `${API_URL}/images/from-story/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://cuentos-ai.web.app'
      },
      body: JSON.stringify({
        id,
        id_token: idToken
      })
    }
  )
  const data = await response.json()
  if (response.status > 300) throw Error(data.detail)
  return data as Images
}
