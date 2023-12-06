import { Card, CardActions, CardContent, CardMedia, IconButton, Container, TextField, Typography, Box, CircularProgress } from '@mui/material'
import React, { useRef, useState } from 'react'
import { MdCached, MdCheck, MdClose, MdEdit } from 'react-icons/md'
import { type Image } from '../../../models/Image.model'
import { type Images } from '../../../models/Stroy.model'
import { generateImage } from '../../../services/ImageService'
import { getToken } from '../../../services/AuthService'
import { LoadingButton } from '@mui/lab'

const ImageCardEdit: React.FC<{ image: Image, context: Images, name: string, type: 'introduction' | 'middle' | 'end', setData: (images: Images) => void }> = ({ image, name, context, type, setData }) => {
  const initial = useRef<Image>(image)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentImage, setCurrentImage] = useState<Image>(image)
  const [edit, setEdit] = useState<boolean>(false)
  const [upload, setUpload] = useState<boolean>(false)

  const changePrompt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentImage({ ...currentImage, params: { ...currentImage.params, prompt: event.target.value } })
  }

  const generateImagen = async () => {
    setLoading(true)
    const newImage = await generateImage(initial.current.params.prompt, await getToken())
    const imageCu: Image = { ...initial.current, url: newImage.url }
    setCurrentImage(imageCu)
    setUpload(true)
    setLoading(false)
  }
  const CheckButton = () => {
    setEdit(false)
    setUpload(false)
    if (initial.current.url !== currentImage.url) {
      const data: Images = {
        ...context,
        [type]: currentImage
      }
      setData(data)
    }
    initial.current = currentImage
  }

  const changeMode = () => {
    setEdit(!edit)
  }

  return (
    <Container className='!max-w-md mb-4 px-3' >
        <Card className='' >
            <CardMedia
                image={currentImage.url}
                component='img'
                />
            <CardContent>
                <Typography variant='h5' className='uppercase !mb-5'>{name}</Typography>
                {edit
                  ? <Box component='form' >
                        <TextField
                            multiline
                            fullWidth
                            label='prompt'
                            rows={4}
                            onChange={changePrompt}
                            value={currentImage.params.prompt}
                        />
                  </Box>
                  : <>
                    <Typography variant='body2' className='text-start' >Prompt</Typography>
                    <Typography variant='body1' className='text-start line-clamp-4' >
                        {currentImage.params.prompt}
                    </Typography>
                  </> }
            </CardContent>
            <CardActions>
                {edit || upload
                  ? <>
                    <IconButton
                    onClick={() => {
                      setCurrentImage(initial.current)
                      setEdit(false)
                      setUpload(false)
                    }}
                    className='!text-base-blue'
                    color='inherit' >
                     <MdClose/>
                  </IconButton>
                  <IconButton
                    onClick={CheckButton}
                    className='!text-base-blue'
                    color='inherit' >
                     <MdCheck/>
                  </IconButton>
                  </>
                  : <>
                      <LoadingButton
                        size="large"
                        loading={loading}
                        variant= 'text'
                        color="inherit"
                        loadingIndicator={<CircularProgress color='inherit' sx={{ color: 'white' }} size={20} />}
                        sx={{ color: 'white', backgroundColor: '#03394f', ':hover': { backgroundColor: '#03384f' } }}
                        onClick={() => {
                          void generateImagen().catch((error) => {
                            console.log(error)
                            setLoading(false)
                          })
                        }}
                        startIcon={<MdCached/>} >otra imagen</LoadingButton>
                      <IconButton
                        onClick={changeMode}
                        className='!text-base-blue'
                        color='inherit' >
                          <MdEdit/>
                      </IconButton>
                    </>}
            </CardActions>
        </Card>
    </Container>
  )
}

export default ImageCardEdit
