import { type Timestamp } from 'firebase/firestore'
import { type Images, type Story } from '../models/Stroy.model'
import { transformArraytoString } from './String.adapter'

export function tranformStoryToString (story: Story) {
  const storyText = `
        ${transformArraytoString(story.introduction)}\n
        ${transformArraytoString(story.middle)}\n
        ${transformArraytoString(story.end)}
    `
  return storyText
}

export function fromAnyToStoryAPI (any: any, id: string): Story {
  if (any.images === undefined) {
    const story: Story = {
      title: any.title as string,
      introduction: any.introduction as string[],
      middle: any.middle as string[],
      end: any.end as string[],
      date: any.date as Date,
      id
    }
    return story
  }
  const story: Story = {
    title: any.title as string,
    introduction: any.introduction as string[],
    middle: any.middle as string[],
    end: any.end as string[],
    date: any.date as Date,
    id: any.id as string,
    images: any.images as Images
  }
  return story
}

export function fromAnyToStory (any: any, id: string): Story {
  const tempDate = any.date as Timestamp
  const date = tempDate.toDate()
  if (any.images === undefined) {
    const story: Story = {
      title: any.title as string,
      introduction: any.introduction as string[],
      middle: any.middle as string[],
      end: any.end as string[],
      date,
      id
    }
    return story
  }
  const story: Story = {
    title: any.title as string,
    introduction: any.introduction as string[],
    middle: any.middle as string[],
    end: any.end as string[],
    date,
    id,
    images: any.images as Images
  }
  return story
}

export const obtainArrayFromStory = (story: Story) => {
  const storyTotal = story.introduction.concat(story.middle).concat(story.end)
  return storyTotal
}
