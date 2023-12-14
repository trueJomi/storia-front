import { type Timestamp } from 'firebase/firestore'
import { type Images, type Story } from '../models/Stroy.model'
import { transformArraytoString } from './String.adapter'
import { type Image } from '../models/Image.model'

export function tranformStoryToString (story: Story) {
  const storyText = `
        ${transformArraytoString(story.introduction)}\n
        ${transformArraytoString(story.middle)}\n
        ${transformArraytoString(story.end)}
    `
  return storyText
}

export function fromAnyToStoryAPI (any: any, id: string): Story {
  const story: Story = {
    title: any.title as string,
    introduction: any.introduction as string[],
    middle: any.middle as string[],
    end: any.end as string[],
    date: any.date as Date,
    id
  }
  if (any.images !== undefined) {
    story.images = any.images as Images
  }
  if (any.image !== undefined) {
    story.image = any.image as Image
  }
  if (any.input !== undefined) {
    story.input = any.input as string
  }
  return story
}

export function fromAnyToStory (any: any, id: string): Story {
  const tempDate = any.date as Timestamp
  const date = tempDate.toDate()
  const story: Story = {
    title: any.title as string,
    introduction: any.introduction as string[],
    middle: any.middle as string[],
    end: any.end as string[],
    date,
    id
  }
  if (any.images !== undefined) {
    story.images = any.images as Images
  }
  if (any.image !== undefined) {
    story.image = any.image as Image
  }
  if (any.input !== undefined) {
    story.input = any.input as string
  }
  return story
}

export const obtainArrayFromStory = (story: Story) => {
  const storyTotal = story.introduction.concat(story.middle).concat(story.end)
  return storyTotal
}
