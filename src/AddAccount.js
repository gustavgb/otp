import React, { useState } from 'react'
import { addAccount } from './utils/api'
import { Container, TextField, Button, Grid } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import PasswordField from './PasswordField'

const AddAccount = ({ onSelect }) => {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [pass, setPass] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (e) => {
    e.preventDefault()

    addAccount(name, code, pass)
      .then(id => onSelect(id))
      .catch(err => {
        console.log(err)
        enqueueSnackbar(err.message, { variant: 'error' })
      })
  }

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              label="Account name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              name="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              label="Account code"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item>
            <PasswordField
              name="pass"
              type="password"
              value={pass}
              onChange={setPass}
              label="Encryption pass"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Save account
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default AddAccount
