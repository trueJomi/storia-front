import { type Images } from '../models/Stroy.model'

export function updateImagesJson (images: Images, url1: string, url2: string, url3: string) {
  images.introduction.url = url1
  images.middle.url = url2
  images.end.url = url3
  return images
}
