import React, { useState } from 'react'
import styled from 'styled-components'
import { addAccount, hash } from './api'
import { usePass } from './pass'
import TextField from './TextField'

const Container = styled.div`
  grid-area: content;
`

const Label = styled.p`

`

const Button = styled.button`
  display: block;
  margin-top: 16px;
`

const Validation = styled.div`
  color: red;
`

const AddAccount = ({ onSelect }) => {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [pass, setPass] = useState('')
  const correctPass = usePass()
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (hash(pass) === correctPass) {
      addAccount(name, code, correctPass)
        .then(() => onSelect(0))
        .catch(err => setError(err.message))
    } else {
      setError('Wrong passphrase')
    }
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
          <Label>Enter your passphrase again</Label>
          <TextField name="pass" type="password" value={pass} onChange={e => setPass(e.target.value)} />
        </label>
        <Button type="submit">
          Save account
        </Button>
        {error && <Validation>{error}</Validation>}
      </form>
    </Container>
  )
}

export default AddAccount
