import React, { useState, useEffect } from 'react'
import { createUserKey, streamUserKey, decrypt } from '@utils/api'
import { Button, Box } from '@mui/material'
import { useSnackbar } from 'notistack'
import PasswordField from '@Components/PasswordField'
import styled from '@emotion/styled'

const Center = styled.div`
  text-align: center;
`

function EnterPass({ onSetPass, uid }) {
  const [pass, setPass] = useState('')
  const [userKey, setUserKey] = useState(null)
  const [ready, setReady] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (userKey) {
        if (!decrypt(userKey, pass)) {
          throw new Error('Wrong password')
        }
      } else {
        await createUserKey(pass)
        enqueueSnackbar('Created user key', { variant: 'success' })
      }

      onSetPass(pass)

      enqueueSnackbar('Unlocked', { variant: 'success' })
    } catch (err) {
      console.log(err)
      enqueueSnackbar(err.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    if (uid) {
      const stream = streamUserKey().subscribe(res => {
        setUserKey(res)
        setReady(true)
      })

      return () => stream.unsubscribe()
    }
  }, [uid])

  if (!ready) {
    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      {userKey ? (
        <span />
      ) : (
        <Center>
          Enter an encryption passphrase below.
          <br />
          This is used for all future end-to-end encryption, so it's important that you remember it.
          <br />
          There's no way of retrieving it later.
          <br />
          Better write it down somewhere!
        </Center>
      )}
      <PasswordField value={pass} onChange={setPass} fullWidth autoFocus />
      <Box mt={2}>
        <Button fullWidth size="large" type="submit" variant="contained" color="primary">
          Unlock
        </Button>
      </Box>
    </form>
  )
}

export default EnterPass
