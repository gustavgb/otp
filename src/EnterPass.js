import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { createUserKey, streamUserKey } from './utils/api'
import TextField from './TextField'

const Button = styled.button`
  flex: 0 0 auto;
`

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr 1fr min-content;
  place-items: center;
  grid-column: 1 / 3;

  @media (max-width: 680px) {
    grid-row: 1 / 3;
    grid-column: 1;
  }
`

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  align-self: end;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`

const Validation = styled.div`
  color: red;
`

function EnterPass ({ onSetPass, uid }) {
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const [userKey, setUserKey] = useState(null)
  const [ready, setReady] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    onSetPass(pass)

    if (!userKey) {
      createUserKey(pass)
        .catch(err => setError(err.message))
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
    <Container onSubmit={handleSubmit}>
      {userKey
        ? <span />
        : (
          <center>Enter an encryption passphrase below.<br />This is used for all future end-to-end encryption, so it's important that you remember it.<br />There's no way of retrieving it later.<br />Better write it down somewhere!</center>
        )}
      <Row>
        <TextField
          value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder="Enter passphrase"
          autoFocus
          type={userKey ? 'password' : 'text'}
        />
        <Button type="submit">
          Done
        </Button>
      </Row>
      {!!error && (
        <Validation>{error}</Validation>
      )}
    </Container>
  )
}

export default EnterPass
