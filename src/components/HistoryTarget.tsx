import React from 'react'
import { type Story } from '../models/Stroy.model'
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HistoryTarget: React.FC<{ story: Story }> = ({ story }) => {
  const navigate = useNavigate()

  return (
    <Card className='mb-4 mx-2 group hover:bg-base-blue grid' >
      <CardActionArea
        className=' duration-200 group-hover:text-white !rounded-b-none'
        onClick={() => {
          navigate(`/story/${story.id}`)
          window.scrollTo(0, 0)
        }}
      >
        <CardContent>

          <Typography variant='h5'>
            {story.title}
          </Typography>
          <Typography variant='body1' className='!my-3 line-clamp-3' >
            {story.introduction[0]}
          </Typography>
          {story.images !== undefined && <div className='flex justify-between mb-2 mr-3' >
              <img src={story.images.introduction.url} loading='lazy' alt='introducción image' className="w-1/3" />
              <img src={story.images.middle.url} loading='lazy' alt='nudo image' className="w-1/3 mx-2" />
              <img src={story.images.end.url} loading='lazy' alt='final image' className="w-1/3" />
            </div>}
          <Typography variant='body2'>
            {story.date.toLocaleDateString('es-PE', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
        </CardContent>
      </CardActionArea>
      {story.images === undefined &&
      <CardActions className='' >
          <Button
            onClick={() => {
              navigate(`/images/${story.id}`)
            }}
            color='inherit'
            variant='contained'
            className='group-hover:!text-base-blue group-hover:!bg-white !bg-base-blue !text-white' >
            <Typography display='block' fontWeight={600} >
              generar imagenes
            </Typography>
          </Button>
      </CardActions>}
    </Card>
  )
}

const HistoryTargetSkeleton: React.FC = () => {
  return (
    <div className='snap-start scroll-mx-3 shrink-0 pr-6 md:pr-0'>
        <button>
          <div className="animate-pulse h-4 w-10" ></div>
        </button>

    </div>
  )
}

export {
  HistoryTarget,
  HistoryTargetSkeleton
}
