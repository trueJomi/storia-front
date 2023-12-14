import React, { useEffect } from 'react'
import { type Question } from '../../../models/Questions.model'
import { type Story } from '../../../models/Stroy.model'
import { Container, Typography } from '@mui/material'
import { QuestionsByType } from '../../../adapters/Question.adapter'
import { useNavigate } from 'react-router-dom'
import SimpleImagePreview from '../../../components/SimpleImagePreview'

const ForDownload: React.FC<{ questions: Question[], story: Story }> = ({ story, questions }) => {
  const navigate = useNavigate()
  useEffect(() => {
    window.print()
    setTimeout(() => {
      navigate(-1)
    }, 3000)
  }, [])
  return (
    <Container maxWidth='md' className="mt-16" >
        <Typography
            variant='h4'
            style={{ textAlign: 'center', marginBottom: 20 }}>
            {story.title}
        </Typography>
        { story.image !== undefined && <div className=' w-full' >
          <SimpleImagePreview url={story.image.url} alt='main' clas='mx-auto' />
        </div>}
        {(story.images?.introduction.url !== undefined) && <SimpleImagePreview url={story.images.introduction.url} alt='introduction' clas='float-right' />}
        {story.introduction.map((paragraft, idx) => (
            <Typography
            paragraph
            variant='body2'
            component={'p'}
            key={idx}>
              {paragraft}
            </Typography>
        ))}
        { story.images?.middle.url !== undefined && <SimpleImagePreview url={story.images.middle.url} alt='middle' clas='float-left' />}
        {story.middle.map((paragraft, idx) => (
            <Typography
            paragraph
            variant='body2'
            component={'p'}
            key={idx}>
              {paragraft}
            </Typography>
        ))}
        { story.images?.end.url !== undefined && <SimpleImagePreview url={story.images.end.url} alt='end' clas='float-right' />}
        {story.end.map((paragraft, idx) => (
            <Typography
            paragraph
            variant='body2'
            component={'p'}
            key={idx}>
              {paragraft}
            </Typography>
        ))}
        {story.input !== undefined && <div className='my-7'>
            <span className="font-bold text-lg" >Frase referencial:</span> {story.input}
          </div>}
        {(questions !== undefined && questions.length !== 0) && <QuestionPDf questions={questions} />}
    </Container>
  )
}

const QuestionPDf: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const questionsType = QuestionsByType(questions)
  return (
    <div>
        <Typography
            variant='h4'
            sx={{ textAlign: 'center', marginTop: 5, marginBottom: 2 }}>
            Preguntas
        </Typography>
        {questionsType.literalQuestions.length !== 0 &&
        <div>
          <Typography variant='h5' sx={{ marginBottom: 2 }} >
            Comprension Literal:
          </Typography>
          <div>
            { questionsType.literalQuestions.map((question, idx) => (
              <div key={idx} >
              <Typography variant='body1' >
                    {question.question}
              </Typography>
              <Typography variant='body1' className='!mt-4' >
                ----------------------------------------------------------------------------------------------------------------------------
              </Typography>
              <Typography variant='body1' className='!mt-4' >
              ------------------------------------------------------------------------------------------------------------------------------
              </Typography>
              <Typography variant='body1' className='!mt-4' >
              ------------------------------------------------------------------------------------------------------------------------------
              </Typography>
            </div>
            ))}
          </div>
        </div>}
        { questionsType.inferencialQuestions.length !== 0 &&
        <div>
          <Typography variant='h5' >
            Comprension inferencial:
          </Typography>
          <div>
          { questionsType.inferencialQuestions.length !== 0 && questionsType.inferencialQuestions.map((question, idx) => (
            <div key={idx} >
              <Typography variant='body1'>
                    {question.question}
              </Typography>
              <Typography variant='body1' className='!mt-4'>
              ------------------------------------------------------------------------------------------------------------------------------
              </Typography>
              <Typography variant='body1' className='!mt-4'>
              ------------------------------------------------------------------------------------------------------------------------------
              </Typography>
              <Typography variant='body1' className='!mt-4' >
              ------------------------------------------------------------------------------------------------------------------------------
              </Typography>
            </div>
          ))}
          </div>
        </div>}
        { questionsType.criticoQuestions.length !== 0 &&
          <div>
            <Typography variant='h5'>
              Comprension Critica:
            </Typography>
            <div>
              { questionsType.criticoQuestions.length !== 0 && questionsType.criticoQuestions.map((question, idx) => (
                <div key={idx} >
                <Typography variant='body1' className='!mt-4'>
                      {question.question}
                </Typography>
                <Typography variant='body1' className='!mt-4' >
                ------------------------------------------------------------------------------------------------------------------------------
                </Typography>
                <Typography variant='body1' className='!mt-4' >
                ------------------------------------------------------------------------------------------------------------------------------
                </Typography>
                <Typography variant='body1' className='!mt-4' >
                  ----------------------------------------------------------------------------------------------------------------------------
                </Typography>
              </div>
              ))}
            </div>
          </div>}
    </div>
  )
}

export default ForDownload
