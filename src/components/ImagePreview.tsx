import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { MdCached, MdCheck, MdClose } from 'react-icons/md'
import { type Image } from '../models/Image.model'
import { generateImage, updateImages } from '../services/ImageService'
import { getToken, getUser } from '../services/AuthService'
import { getPromptByRaw } from '../adapters/String.adapter'
import { type Images } from '../models/Stroy.model'

const ImagePreview: React.FC<{ image: Image, context: Images, alt: 'introduction' | 'middle' | 'end', clas: string, idStory: string | undefined }> = ({ image, alt, clas, idStory, context }) => {
  const [imageCurrent, setImageCurrent] = React.useState<Image>(image)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [imageInit, setImageInit] = useState<Image>(image)

  const handleImage = async () => {
    setLoading(true)
    const prompt = getPromptByRaw(image.params.prompt)
    try {
      const newImage = await generateImage(prompt, await getToken())
      setImageCurrent(newImage)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const CheckImage = async () => {
    if (idStory !== undefined) {
      setImageInit({
        ...imageInit,
        url: imageCurrent.url
      })
      const data: Images = {
        ...context,
        [alt]: imageCurrent
      }
      await updateImages(getUser().uid, data, idStory)
    }
  }

  const CloseAndForgoten = () => {
    setImageCurrent(imageInit)
  }

  return (
    <div className={`rounded-md h-44 w-44 m-2 ${clas} relative group`} >
        <div className=' bg-opacity-0 bg-black absolute w-full h-full rounded-md group-hover:bg-opacity-50 duration-200 grid place-items-center' >
          <div className='flex' >
            { loading
              ? <CircularProgress/>
              : <>
                  <Tooltip title ='nueva imagen' >
                    <IconButton color='inherit' style={{ color: 'white' }} className='opacity-0 group-hover:opacity-100'
                      onClick={() => {
                        void handleImage()
                      } }
                    >
                      <MdCached/>
                    </IconButton>
                  </Tooltip>
                  {imageCurrent.url !== imageInit.url &&
                      <>
                        <Tooltip title ='guardar iamgen' className='' >
                          <IconButton
                            onClick={() => {
                              void CheckImage()
                            } }
                            color='inherit' style={{ color: 'white' }} className='opacity-0 group-hover:opacity-100' >
                            <MdCheck/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title ='cancelar' className='' >
                          <IconButton
                            onClick={CloseAndForgoten}
                            color='inherit' style={{ color: 'white' }} className='opacity-0 group-hover:opacity-100' >
                            <MdClose/>
                          </IconButton>
                        </Tooltip>
                    </>}
              </>
              }
          </div>
        </div>
        <img src={ imageCurrent.url } alt={ `${alt}_image` } className='w-full rounded-md' />
    </div>
  )
}

export default ImagePreview
