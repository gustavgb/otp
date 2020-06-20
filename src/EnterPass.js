import React, { useState, useEffect } from 'react'
import { createUserKey, streamUserKey, decrypt } from './utils/api'
import { Container, Button, Box } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import PasswordField from './PasswordField'

function EnterPass ({ onSetPass, uid }) {
  const [pass, setPass] = useState('')
  const [userKey, setUserKey] = useState(null)
  const [ready, setReady] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (e) => {
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
      const stream = streamUserKey()
        .subscribe(res => {
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
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        {userKey
          ? <span />
          : (
            <center>Enter an encryption passphrase below.<br />This is used for all future end-to-end encryption, so it's important that you remember it.<br />There's no way of retrieving it later.<br />Better write it down somewhere!</center>
          )}
        <PasswordField value={pass} onChange={setPass} fullWidth autoFocus />
        <Box mt={2}>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            Unlock
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default EnterPass
