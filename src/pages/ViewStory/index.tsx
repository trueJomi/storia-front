import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteStory, getStory } from '../../services/StoryService'
import { getUser } from '../../services/AuthService'
import { type Story } from '../../models/Stroy.model'
import StoryCompleteAdaptative from '../../components/StoryCompleteAdaptative'
import Loading from '../../components/Loading'
import { Container, IconButton, Stack, Tooltip } from '@mui/material'
import Questions from './components/Questions'
import { type Question } from '../../models/Questions.model'
import { getQuestions } from '../../services/QuestionsService'
import { MdDelete } from 'react-icons/md'
import DownloadButton from '../../components/DownloadButton'
// import { PDFDownloadLink } from '@react-pdf/renderer'
// import PdfDocStory from '../../components/PdfDocStory'

const ViewStory: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = React.useState<Story | undefined>(undefined)
  const [questions, setQuestions] = React.useState<Question[] | undefined>(undefined)

  useEffect(() => {
    if (id !== undefined) {
      void getStory(getUser().uid, id).then((story) => {
        setStory(story)
      })
    }
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      void getQuestions(getUser().uid, id, setQuestions)
    }
  }, [])

  if (questions === undefined && story === undefined) {
    return <Loading/>
  }

  return (
    questions !== undefined && story !== undefined
      ? <Container maxWidth="xl">
          <Stack className='mb-5' >
            <div className=' flex justify-between' >
              <DownloadButton story={story} />
              <Tooltip title ='eliminar cuento' >
                <IconButton
                  onClick={() => {
                    if (story.id !== undefined) {
                      void deleteStory(getUser().uid, story.id)
                      navigate('/')
                    }
                  }}
                  color='error' >
                  <MdDelete/>
                </IconButton>
              </Tooltip>
            </div>
          </Stack>
          <StoryCompleteAdaptative story={story} />
          {story.input !== undefined && <Stack className='my-7'>
            <span className="font-bold text-lg" >Frase referencial:</span> {story.input}
          </Stack>}
          <Questions data={questions} story={story}/>
        </Container>
      : <Loading/>
  )
}

export default ViewStory
