import React, { useState } from 'react'
import styled from 'styled-components'
import { addAccount } from './api'
import { usePass } from './pass'
import TextField from './TextField'

const Container = styled.div`
`

const Label = styled.p`

`

const Button = styled.button`
  display: block;
  margin-top: 16px;
`

const AddAccount = () => {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const pass = usePass()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAccount(name, code, pass)
      .catch(console.error)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label>
          <Label>Account name</Label>
          <TextField name="name" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          <Label>Account code</Label>
          <TextField name="code" value={code} onChange={e => setCode(e.target.value)} />
        </label>
        <label>
          <Label>Passphrase</Label>
          <TextField name="pass" type="password" value={pass} onChange={e => { e.preventDefault() }} />
        </label>
        <Button type="submit">
          Save account
        </Button>
      </form>
    </Container>
  )
}

export default AddAccount
