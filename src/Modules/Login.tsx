import React, { useState } from 'react'
import { signIn } from '@/utils/api'
import { TextField, Button, Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import PasswordField from '@Components/PasswordField'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await signIn(email, password)
    } catch (err) {
      console.log(err)
      enqueueSnackbar(err.message, { variant: 'error' })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            label="Email"
          />
        </Grid>
        <Grid item>
          <PasswordField value={password} onChange={setPassword} fullWidth label="Password" />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" size="large" color="primary" fullWidth>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Login
