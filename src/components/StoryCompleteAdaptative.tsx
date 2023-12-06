import React from 'react'
import { type Story } from '../models/Stroy.model'
import { Container, Typography } from '@mui/material'
import ImagePreview from './ImagePreview'

const StoryCompleteAdaptative: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <Container maxWidth='md' className="overflow-auto !px-0" >
        <Typography
            variant='h4'
            style={{ textAlign: 'center', marginBottom: 20 }}>
            {story.title}
        </Typography>
        {(story.images?.introduction.url !== undefined) && <ImagePreview context={story.images} image={story.images.introduction} idStory = {story.id} alt='introduction' clas='float-right' />}
        {story.introduction.map((paragraft, idx) => (
            <Typography
            paragraph
            variant='body2'
            component={'p'}
            key={idx}>
              {paragraft}
            </Typography>
        ))}
        { story.images?.middle.url !== undefined && <ImagePreview context={story.images} image={ story.images.middle} idStory = {story.id} alt='middle' clas='float-left' />}
        {story.middle.map((paragraft, idx) => (
            <Typography
            paragraph
            variant='body2'
            component={'p'}
            key={idx}>
              {paragraft}
            </Typography>
        ))}
        { story.images?.end.url !== undefined && <ImagePreview context={story.images} image={story.images.end} idStory = {story.id} alt='end' clas='float-right' />}
        {story.end.map((paragraft, idx) => (
            <Typography
            paragraph
            variant='body2'
            component={'p'}
            key={idx}>
              {paragraft}
            </Typography>
        ))}
    </Container>
  )
}

export default StoryCompleteAdaptative
