import React, { useEffect, useState } from 'react'
import { getToken, getUser } from '../../services/AuthService'
import { getStory } from '../../services/StoryService'
import { type Images, type Story } from '../../models/Stroy.model'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress, Stack, Typography } from '@mui/material'
import Loading from '../../components/Loading'
import ImageCardEdit from './components/ImageCardEdit'
import { generateImages3, updateImages } from '../../services/ImageService'
import { LoadingButton } from '@mui/lab'

const ImagesGenrate: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = useState<Story | undefined>(undefined)
  const [imagesTotal, setImagesTotal] = useState<Images | undefined >(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const getData = async () => {
    if (id !== undefined) {
      const data = await getStory(getUser().uid, id)
      return data
    }
  }

  const handleClickSave = async () => {
    setLoading(true)
    try {
      if (id !== undefined && imagesTotal !== undefined) {
        await updateImages(getUser().uid, imagesTotal, id)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setLoading(false)
    navigate(`/story/${id}`)
  }

  useEffect(() => {
    void getData().then((data) => {
      setStory(data)
    })
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      void getToken().then((token) => {
        void generateImages3(id, token).then((data) => {
          setImagesTotal(data)
        }).catch(() => {
          navigate(`/story/${id}`)
        })
      })
    }
  }, [])

  return (
    (story !== undefined && imagesTotal !== undefined)
      ? <Stack className='mx-5 text-center' >
          <Typography variant='h5' className='!mb-8' >
            Añadir imagenes {story?.title}
          </Typography>
          <div className='grid grid-cols-1 md:grid-cols-2' >
            <ImageCardEdit image={imagesTotal.introduction} context={imagesTotal} setData={setImagesTotal} type='introduction' name='introducción' />
            <ImageCardEdit image={imagesTotal.middle} context={imagesTotal} setData={setImagesTotal} type='middle' name='nudo' />
            <ImageCardEdit image={imagesTotal.end} context={imagesTotal} setData={setImagesTotal} type='end' name='desenlace' />
          </div>
          <LoadingButton
          fullWidth
          size="large"
          loading={loading}
          type="submit"
          variant= 'text'
          color="inherit"
          loadingIndicator={<CircularProgress color='inherit' sx={{ color: 'white' }} size={20} />}
          sx={{ color: 'white', backgroundColor: '#03394f', ':hover': { backgroundColor: '#03384f' } }}
          onClick={() => {
            void handleClickSave()
          }}
        >
          Guardar
        </LoadingButton>
        </Stack>
      : <Loading/>
  )
}

export default ImagesGenrate
