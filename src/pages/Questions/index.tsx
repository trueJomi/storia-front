import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { type Story } from '../../models/Stroy.model'
import { getStory } from '../../services/StoryService'
import { getUser } from '../../services/AuthService'
import Loading from '../../components/Loading'
import QuestionForm from './components/QuestionForm'
import { Container } from '@mui/material'
import { generateQuestions } from '../../services/QuestionsService'

const QuestionsPage: React.FC = () => {
  const { id } = useParams()
  const [story, setStory] = React.useState<Story | undefined>(undefined)

  useEffect(() => {
    if (id !== undefined) {
      void getStory(getUser().uid, id).then((story) => {
        setStory(story)
      })
    }
  }, [])
  if (story === undefined) {
    return <Loading/>
  }

  return (
    <Container maxWidth='xl' >
      <QuestionForm
        story={story}
        generateQuestions={async (form) => {
          return await generateQuestions(form)
        }}
      />
    </Container>
  )
}

export default QuestionsPage
