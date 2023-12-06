import React from 'react'
import { type Question } from '../../../models/Questions.model'
import { MdDelete, MdExpandMore, MdMoreVert } from 'react-icons/md'
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip, Typography } from '@mui/material'

const QuestionTarget: React.FC<{ question: Question, modalReferences: (items: number[]) => void, deleteQuestion: (questionId: string) => Promise<void> }> = ({ question, modalReferences, deleteQuestion }) => {
  return (
    <div>
        <Accordion className='mt-5' >
            <AccordionSummary
                expandIcon={<MdExpandMore/>}
            >
                <Typography>{question.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className=' flex justify-between' >
                    <Typography variant='h6' className='!italic !mb-2' >## Respuesta: </Typography>
                    <div>
                        <Tooltip title ='referencia utilizadas' >
                            <IconButton size='medium' onClick={() => { modalReferences(question.reference) }}>
                                <MdMoreVert/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title ='eliminar pregunta' >
                            <IconButton color='error' onClick={() => {
                              if (question.id !== undefined) {
                                void deleteQuestion(question.id).then()
                              }
                            }} >
                                <MdDelete/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                {question.response}
            </AccordionDetails>
        </Accordion>
    </div>
  )
}

export default QuestionTarget
