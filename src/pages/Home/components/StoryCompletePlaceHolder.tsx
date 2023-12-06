import { Alert, Box, Collapse, Typography } from '@mui/material'
import React from 'react'

const StoryCompletePlaceHolder: React.FC<{ error: string | undefined }> = ({ error }) => {
  return (
    <Box>
      <Typography sx={{ textTransform: 'uppercase', textAlign: 'center', fontSize: '2rem', fontWeight: 1000 }} >
        Crear un cuento con imagenes
      </Typography>
      <Collapse in={error !== undefined}>
        <Alert severity='error'>
            Ha ocurrido un error: {error}
         </Alert>
      </Collapse>
      <Typography sx={{ mt: 5, textAlign: 'center' }}>
        crea tu cuento con solo una frase
      </Typography>
    </Box>
  )
}

export default StoryCompletePlaceHolder
