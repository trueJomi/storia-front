import React from 'react'
import { type Story } from '../models/Stroy.model'
import { HistoryTarget } from './HistoryTarget'
import { Card, Typography } from '@mui/material'
import TextSkeleton from './Skeleton/TextSkeleton'
import { FaArrowUp } from 'react-icons/fa'

const History: React.FC<{ data: Story[] | undefined }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2" >
        { data === undefined && [1, 2, 3, 4, 5, 6].map((i) => (
              <HistorySkeleton key={i} />
        ))}
        { data?.map((storyHistorial, idx) => (
                <HistoryTarget story={storyHistorial} key={idx} />
        ))}
        { (data !== undefined && data.length === 0) &&
        <div className='mb-32 -mt-2 text-4xl w-ful justify-center flex col-span-1 md:col-span-2' >
          <div>
              <div className='flex justify-center mb-3 animate-bounce' >
                  <FaArrowUp/>
              </div>
              <Typography variant='h5' >Crea tu primera historia</Typography>
          </div>
      </div>}
    </div>
  )
}

const HistorySkeleton: React.FC = () => {
  return (
        <Card className='mx-2 mb-4 !bg-slate-200 animate-pulse' >
            <div className="w-full px-4 py-5 h-full grid items-center" >
                <div>
                    <div className=' pb-4' >
                        <TextSkeleton/>
                    </div>
                    <div className='pb-2' >
                        <TextSkeleton size={1.2} />
                    </div>
                    <div className='pb-2' >
                        <TextSkeleton size={1.2} />
                    </div>
                    <div className='pb-2' >
                        <TextSkeleton size={1.2} />
                    </div>
                    <div className='w-1/2 mt-2' >
                        <TextSkeleton size={1} />
                    </div>
                </div>
            </div>
        </Card>
  )
}

export default History
