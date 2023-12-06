import { type Image } from './Image.model'

export interface Story {
  id?: string
  title: string
  introduction: string[]
  middle: string[]
  end: string[]
  images?: Images
  date: Date
}

export interface Images {
  introduction: Image
  middle: Image
  end: Image
}
