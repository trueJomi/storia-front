import React, { useState } from 'react'
import { Box, Alert, Snackbar, TextField, IconButton, type SnackbarCloseReason, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material'
import { MdClose, MdSend } from 'react-icons/md'
import { LoadingButton } from '@mui/lab'
import { generosList } from '../utils/generos.utils'

interface PropsInput {
  getCuento: (prompt: string) => Promise<void>
  loading: boolean
}

export const ChatInput: React.FC<PropsInput> = ({ getCuento, loading }) => {
  const [prompt, setPrompt] = useState<string>('')
  const [genero, setGenero] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = (_event: any, reason: SnackbarCloseReason) => {
    if (reason !== 'clickaway') {
      setOpen(false)
    }
  }

  const sendCuento = (input: React.FormEvent<HTMLFormElement>) => {
    input.preventDefault()
    if (prompt !== '') {
      const promptWithGenero = generosList[genero].function(prompt)
      void getCuento(promptWithGenero).then(() => {
        setOpen(true)
        setPrompt('')
      })
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    const newGenero = parseInt(value)
    setGenero(newGenero)
  }

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={handleClose} >
        <Alert
          severity='success'
          action={
            <IconButton
              aria-label='close'
              color="inherit"
              size='small'
              onClick={() => { setOpen(false) }}
            >
                <MdClose/>
            </IconButton>
          }
        >
          cuento realizado
        </Alert>
      </Snackbar>
      <Box onSubmit={sendCuento} sx={{ my: 1, display: 'flex', width: '100%' }} component='form' >
        <FormControl className='w-44' >
          <InputLabel>Genero</InputLabel>
          <Select
            label="Genero"
            disabled={loading}
            value={String(genero)}
            onChange={handleChange}
          >
            {generosList.map((genero, idx) => (
              <MenuItem key={genero.nombre} value={idx}>{genero.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type='text'
          disabled={loading}
          label='Escribe una frase'
          value={prompt}
          onChange={(e) => { setPrompt(e.target.value) }}
          sx={{ mx: 1 }}
        />
        <LoadingButton
          type='submit'
          loading={loading}
          sx={{ width: 50, height: 50, my: 0.5, fontSize: 30, color: 'black' }} >
            <MdSend/>
        </LoadingButton>
    </Box>
    </>
  )
}
