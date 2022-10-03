import React, { useState } from 'react'
import { addAccount } from '@utils/api'
import { TextField, Button, Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { usePass } from '@utils/pass'

const AddAccount = () => {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const pass = usePass()

  const handleSubmit = e => {
    e.preventDefault()

    addAccount(name, code, pass)
      .then(() => navigate('/'))
      .catch(err => {
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save account
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddAccount
