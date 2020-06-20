import React, { useState } from 'react'
import { auth } from './utils/api'
import { Container, TextField, Button, Grid } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import PasswordField from './PasswordField'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
      enqueueSnackbar(err.message, { variant: 'error' })
    }
  }

  return (
    <Container maxWidth="xs">
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
            <PasswordField
              type="password"
              value={password}
              onChange={setPassword}
              fullWidth
              label="Password"
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Login
