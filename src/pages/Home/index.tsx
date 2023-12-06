import { Box, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ChatInput } from '../../components/ChatInput'
import StoryCompletePlaceHolder from './components/StoryCompletePlaceHolder'
import {
  createEvaluation,
  getHistorialStory
} from '../../services/StoryService'
import { type Story } from '../../models/Stroy.model'
import { auth, getToken } from '../../services/AuthService'
import StoryCompleteAdaptative from '../../components/StoryCompleteAdaptative'
import History from '../../components/History'
import DownloadButton from '../../components/DownloadButton'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [result, setResult] = useState<Story | undefined>(undefined)
  const [apiError, setApiError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [historial, setHistorial] = useState<Story[] | undefined >(undefined)

  const getCuento = async (prompt: string) => {
    setResult(undefined)
    setLoading(true)
    try {
      const token = await getToken()
      const data = await createEvaluation(prompt, token)
      navigate(`/story/${data.id}`)
      setResult(data)
      setLoading(false)
    } catch (error) {
      const err = error as Error
      setLoading(false)
      setApiError(err.message)
      throw new Error('Error al obtener el cuento')
    }
  }

  const getHistorial = () => {
    if (auth.currentUser !== null) {
      void getHistorialStory(auth.currentUser.uid, setHistorial)
    }
  }

  useEffect(() => {
    getHistorial()
  }, [])

  useEffect(() => {
    if (apiError !== undefined) {
      setTimeout(() => {
        setApiError(undefined)
      }, 7000)
    }
  }, [apiError])

  return (
    <Container maxWidth="xl">
      <Box className='h-[calc(100vh-64px)]' >
        <Grid className='h-[calc(100%-100px)]' >
          {result === undefined
            ? <StoryCompletePlaceHolder error={apiError} />
            : <>
                <DownloadButton story={result} />
                <div className=' overflow-auto h-[calc(100%-35px)] w-full' >
                  <StoryCompleteAdaptative story={result}/>
                </div>
              </>}
        </Grid>
        <Grid sx={{ height: '18%' }} >
          <ChatInput getCuento={getCuento} loading={loading} />
        </Grid>
      </Box>
      <History data={historial} />
    </Container>
  )
}

export default HomePage
