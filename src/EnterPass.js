import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { streamUserKey, decrypt, createUserKey } from './api'

const Input = styled.input`
  padding: 10px;
`

const Button = styled.button``

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  place-items: center;
  grid-column: 1 / 3;
`

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: stretch;
  width: 50%;
`

const Validation = styled.div`
  color: red;
`

function EnterPass ({ onSubmit }) {
  const [pass, setPass] = useState('')
  const [userKey, setUserKey] = useState(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userKey || decrypt(userKey, pass)) {
      onSubmit(pass)

      if (!userKey) {
        createUserKey(pass)
      }
    } else {
      setFailed(true)
    }
  }

  useEffect(() => {
    const stream = streamUserKey()
      .subscribe(res => {
        setUserKey(res)
        setReady(true)
      })

    return () => stream.unsubscribe()
  }, [setUserKey])

  if (!ready) {
    return null
  }

  return (
    <Container onSubmit={handleSubmit}>
      {userKey ? <span /> : (
        <center>Enter a encryption passphrase below.<br />This is used for all future end-to-end encryption, so it's important that you remember it.<br />There's no way of retrieving it later.<br />Better write it down somewhere!</center>
      )}
      <Row>
        <Input
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
      {failed && (
        <Validation>Wrong passphrase</Validation>
      )}
    </Container>
  )
}

export default EnterPass
