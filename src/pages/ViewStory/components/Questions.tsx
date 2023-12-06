import React, { useState } from 'react'
import { type Question } from '../../../models/Questions.model'
import { Backdrop, Box, Button, CircularProgress, Fade, Modal, Stack, Typography } from '@mui/material'
import { MdQuestionMark } from 'react-icons/md'
import Loading from '../../../components/Loading'
import { type Story } from '../../../models/Stroy.model'
import { obtainArrayFromStory } from '../../../adapters/Stroy.adapter'
import { useNavigate } from 'react-router-dom'
import QuestionTarget from './QuestionTarget'
import { obtainForIndex } from '../../../utils/lists.utils'
import { deleteQuestion, generateQuestionsEvaluate } from '../../../services/QuestionsService'
import { getToken, getUser } from '../../../services/AuthService'
import { QuestionsByType } from '../../../adapters/Question.adapter'
import { LoadingButton } from '@mui/lab'

const Questions: React.FC<{ data: Question[] | undefined, story: Story }> = ({ data, story }) => {
  if (data === undefined) {
    return <Loading/>
  }
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const arrayData = obtainArrayFromStory(story)
  const [loading, setLoading] = useState<boolean>(false)
  const [questionsModal, setQuestionsModal] = useState<number[] | undefined>(undefined)
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }
  const questions = QuestionsByType(data)
  const createQuestion = async () => {
    const token = await getToken()
    if (story.id !== undefined) {
      await generateQuestionsEvaluate(token, story.id)
      setLoading(false)
    }
  }

  return (
    <Stack>
        <Stack >
            <div className=' flex justify-between' >
              <Typography variant='h4' >Preguntas</Typography>
              <LoadingButton
                  loading = {loading}
                  type="submit"
                  variant= 'text'
                  color="inherit"
                  loadingIndicator={<CircularProgress color='inherit' sx={{ color: 'white' }} size={20} />}
              sx={{ color: 'white', backgroundColor: '#03394f', ':hover': { backgroundColor: '#03384f' } }}
                  endIcon={<MdQuestionMark/>}
                  onClick={() => {
                    setLoading(true)
                    void createQuestion().then(() => { setLoading(false) })
                  }} >
                  <Typography >Crear Evaluacaion</Typography>
              </LoadingButton>
              <Button
                  variant='contained'
                  color='inherit'
                  className='!bg-base-blue !text-white over'
                  startIcon={<MdQuestionMark/>}
                  onClick={() => { navigate(`/questions/${story.id}`) }} >
                  <Typography >Crear Pregunta</Typography>
              </Button>
            </div>
        </Stack>
        <Stack className='mt-4' >
            <Typography variant='h5' >Comprension Literal</Typography>
            { questions.literalQuestions.length !== 0
              ? questions.literalQuestions.map((item) => (
                <QuestionTarget key={item.id} question={item}
                modalReferences={(reference) => {
                  setQuestionsModal(reference)
                  handleOpen()
                }}
                deleteQuestion={ async (questionId) => {
                  if (story.id !== undefined) {
                    await deleteQuestion(getUser().uid, story.id, questionId)
                  }
                }}
                />
              ))
              : <QuestionsTargetVoid/> }
        </Stack>
        <Stack className='mt-4' >
            <Typography variant='h5' >Comprension Inferencial</Typography>
            { questions.inferencialQuestions.length !== 0
              ? questions.inferencialQuestions.map((item) => (
                <QuestionTarget
                  key={item.id}
                  question={item} modalReferences={(reference) => {
                    setQuestionsModal(reference)
                    handleOpen()
                  }}
                  deleteQuestion={ async (questionId) => {
                    if (story.id !== undefined) {
                      await deleteQuestion(getUser().uid, story.id, questionId)
                    }
                  }}
                />
              ))
              : <QuestionsTargetVoid/> }
        </Stack>
        <Stack className='mt-4' >
            <Typography variant='h5'>Comprension Critica</Typography>
            { questions.criticoQuestions.length !== 0
              ? questions.criticoQuestions.map((item) => (
                <QuestionTarget
                  key={item.id}
                  question={item}
                  modalReferences={(reference) => {
                    setQuestionsModal(reference)
                    handleOpen()
                  }}
                  deleteQuestion={ async (questionId) => {
                    if (story.id !== undefined) {
                      await deleteQuestion(getUser().uid, story.id, questionId)
                    }
                  }}
                  />
              ))
              : <QuestionsTargetVoid/> }
        </Stack>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflow: 'auto'
          }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Pregunta referente  la parte
            </Typography>
            { questionsModal !== undefined && obtainForIndex(arrayData, questionsModal).map((item, index) => (
                <Typography key={index} id="transition-modal-description" sx={{ mt: 2 }}>
                    {item}
                </Typography>
            ))}
          </Box>
        </Fade>
      </Modal>
    </Stack>
  )
}

const QuestionsTargetVoid: React.FC = () => {
  return (
    <div className='my-14 text-center' >
      No hay preguntas de este tipo
    </div>
  )
}

export default Questions
