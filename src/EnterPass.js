import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { streamUserKey, decrypt, createUserKey, hash } from './api'

const Input = styled.input`
  padding: 10px;
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
`

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

const Options = styled.label`
  align-self: start;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const Validation = styled.div`
  color: red;
`

function EnterPass ({ onSubmit }) {
  const [pass, setPass] = useState('')
  const [userKey, setUserKey] = useState(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [savePass, setSavePass] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const hashedPass = hash(pass)

    if (!userKey || decrypt(userKey, hashedPass)) {
      onSubmit(hashedPass)

      if (savePass) {
        window.sessionStorage.setItem('pass', hashedPass)
      }

      if (!userKey) {
        createUserKey(hashedPass)
      }
    } else {
      setFailed(true)
    }
  }

  useEffect(() => {
    const stream = streamUserKey()
      .subscribe(res => {
        setUserKey(res)

        const savedPass = window.sessionStorage.getItem('pass')
        if (savedPass && decrypt(res, savedPass)) {
          onSubmit(savedPass)
        } else {
          setReady(true)
        }
      })

    return () => stream.unsubscribe()
  }, [setUserKey, onSubmit])

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
      <Options>
        <input type="checkbox" value={savePass} onChange={(e) => setSavePass(e.target.checked)} />
        Save passphrase in this session?
      </Options>
      {failed && (
        <Validation>Wrong passphrase</Validation>
      )}
    </Container>
  )
}

export default EnterPass
