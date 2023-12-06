import { type Images } from '../models/Stroy.model'

export function valdiateUrlImage (images: Images) {
  if (images.introduction.url === undefined) {
    return false
  } else if (images.middle.url === undefined) {
    return false
  } else if (images.end.url === undefined) {
    return false
  } else {
    return true
  }
}
