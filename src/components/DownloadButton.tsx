import { Button } from '@mui/material'
import React from 'react'
import { type Story } from '../models/Stroy.model'
import { useNavigate } from 'react-router-dom'
import { FaFilePdf } from 'react-icons/fa'
// import { PDFDownloadLink } from '@react-pdf/renderer'
// import PdfDocStory from './PdfDocStory'

const DownloadButton: React.FC<{ story: Story }> = ({ story }) => {
  const navigate = useNavigate()
  return (
    <>
        {/* <PDFDownloadLink document={
            <PdfDocStory story={story} questions={questions} />
        } fileName={story.title}>
            <Button variant='contained' color='inherit' className='!bg-base-blue !text-white' startIcon={<FaFilePdf/>} >
                descargar
            </Button>
        </PDFDownloadLink> */}
        <Button variant='contained' color='inherit' className='!bg-base-blue !text-white' startIcon={<FaFilePdf/>} onClick={() => { navigate(`/story/d/${story.id}`) }} >
            descargar
        </Button>
    </>
  )
}

export default DownloadButton
