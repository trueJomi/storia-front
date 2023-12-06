import {
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import React, { useState } from 'react'
import { type Story } from '../../../models/Stroy.model'
import { obtainArrayFromStory } from '../../../adapters/Stroy.adapter'
import { LoadingButton } from '@mui/lab'
import { tiposPreguntas } from '../../../context/const.context'
import { type FormQuestion } from '../../../models/utils/FormQuestion'
import { getToken } from '../../../services/AuthService'
import { type Question } from '../../../models/Questions.model'
import { useNavigate } from 'react-router-dom'

const QuestionForm: React.FC<{ generateQuestions: (form: FormQuestion) => Promise<Question[]>, story: Story }> = ({ generateQuestions, story }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [reference, setReference] = useState<string[]>([])
  const [tipos, setTipos] = useState<('literal' | 'inferencial' | 'critico') | undefined>(undefined)
  const arrayStory = obtainArrayFromStory(story)

  const handleReference = (_event: React.MouseEvent<HTMLElement>, newReferences: string[]) => {
    setReference(newReferences)
  }

  const submitHadle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const { cantidad } = Object.fromEntries(new FormData(event.currentTarget))
    const cantidadInt = parseInt(cantidad.toString())
    if (reference.length === 0) {
      setLoading(false)
      return
    } else if (tipos === undefined || cantidad === undefined || cantidadInt <= 0) {
      setLoading(false)
      return
    }
    const refInt = reference.map((item) => parseInt(item))
    if (cantidad === undefined || cantidadInt <= 0) {
      setLoading(false)
      return
    }
    if (story.id !== undefined) {
      const form: FormQuestion = {
        id_token: await getToken(),
        id: story.id,
        paragrafth: refInt,
        type: tipos,
        cantidad: cantidadInt
      }
      try {
        await generateQuestions(form)
      } catch (error) {
        alert('Error al generar las preguntas')
        setLoading(false)
        return
      }
      setLoading(false)
      navigate(`/story/${story.id}`)
    }
  }

  return (
    <form onSubmit={(e) => {
      void submitHadle(e)
    } } >
        <Stack className='my-5' >
          <FormControl
            required
            disabled={loading}
          >
              <FormLabel>
                  Tipo de Pregunta
              </FormLabel>
              <RadioGroup
                onChange={(e) => { setTipos(e.target.value as 'literal' | 'inferencial' | 'critico') }}
                name='tipo' >
                  <FormControlLabel value={tiposPreguntas.literal} control={<Radio/>} label={tiposPreguntas.literal} />
                  <FormControlLabel value={tiposPreguntas.inferencial} control={<Radio/>} label={tiposPreguntas.inferencial} />
                  <FormControlLabel value={tiposPreguntas.critico} control={<Radio/>} label={tiposPreguntas.critico} />
              </RadioGroup>
          </FormControl>
          <Divider className='!my-5' />
          <FormLabel>
            De que parte trata la pregunta:
          </FormLabel>
          <ToggleButtonGroup
              disabled={loading}
              color= 'primary'
              size='small'
              orientation='vertical'
              className='mb-5'
              value={reference.map((item) => item.toString())}
              onChange={handleReference}
          >
              {arrayStory.map((item, idx) => (
                  <ToggleButton
                    size='small'
                    fullWidth
                    className='!lowercase text-start'
                    value={idx.toString()} key={idx} >
                      {item}
                  </ToggleButton>
              ))}
          </ToggleButtonGroup>
          <Divider className='!my-5' />
          <TextField
              disabled={loading}
              label='Cantidad de Preguntas'
              type='number'
              name='cantidad'
              required
              fullWidth
              variant='outlined'
          />
        </Stack>
        <Stack>
          <LoadingButton
              size="large"
              loading={loading}
              type="submit"
              variant= 'text'
              color="inherit"
              loadingIndicator={<CircularProgress color='inherit' sx={{ color: 'white' }} size={20} />}
              sx={{ color: 'white', backgroundColor: '#03394f', ':hover': { backgroundColor: '#03384f' } }}
          >
              Generar
          </LoadingButton>
        </Stack>
    </form>
  )
}

export default QuestionForm
