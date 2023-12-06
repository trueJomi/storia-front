import React, { useState } from 'react'
// import { type Story } from '../../models/Stroy'
// import { HistoryTarget } from './components/HistoryTarget'
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  alpha,
  useTheme
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../../services/AuthService'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { bgGradient } from './../../utils/css'
import { logoPng } from '../../context/images.context'

const LoginPage: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleClick = (input: React.FormEvent<HTMLFormElement>): void => {
    input.preventDefault()
    setLoading(true)
    void logIn(email, password).then(() => {
      navigate('/')
      setLoading(false)
    }).catch((error) => {
      setError(error.message)
      setLoading(false)
    })
  }

  const renderForm = (
      <Stack onSubmit={handleClick} component='form' >
        <Stack spacing={3} >
          <TextField name="email" label="Email address" value={email} onChange={(input) => { setEmail(input.target.value) }} />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => { setShowPassword(!showPassword) }} edge="end">
                    {showPassword ? <FaEye/> : <FaEyeSlash/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
            value={password}
            onChange={(input) => { setPassword(input.target.value) }}
          />
        </Stack>
        <Stack>
          {error !== undefined && <Typography variant="body2" color="error">{error}</Typography>}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover" className='italic'>
            no tienes cuenta, Registrate?
          </Link>
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          loading={loading}
          type="submit"
          variant= 'text'
          color="inherit"
          loadingIndicator={<CircularProgress color='inherit' sx={{ color: 'white' }} size={20} />}
          sx={{ color: 'white', backgroundColor: '#03394f', ':hover': { backgroundColor: '#03384f' } }}
        >
          Login
        </LoadingButton>
      </Stack>
  )

  return (
      <Box
        alignItems={'center'}
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg'
          }),
          height: '100vh'
        }}
      >
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420
            }}
          >
            <img src={logoPng} alt="logo" className="w-40 h-40 mx-auto" />
            <Typography variant="h5" className="text-center" >Sign in</Typography>
            <Divider sx={{ my: 3 }}/>
            {renderForm}
          </Card>
        </Stack>
      </Box>
  )
}

export default LoginPage
