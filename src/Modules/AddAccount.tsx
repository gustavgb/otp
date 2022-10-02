import React, { useState } from 'react'
import { addAccount } from '@utils/api'
import { TextField, Button, Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import PasswordField from '@Components/PasswordField'

const AddAccount = () => {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [pass, setPass] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = e => {
    e.preventDefault()

    addAccount(name, code, pass).catch(err => {
      console.log(err)
      enqueueSnackbar(err.message, { variant: 'error' })
    })
  }

  return (
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
            value={pass}
            onChange={setPass}
            label="Encryption pass"
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save account
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddAccount
