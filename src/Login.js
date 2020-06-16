import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from './utils/api'
import TextField from './TextField'

const LoginForm = styled.form`
  grid-column: 1 / end;
  grid-row: 1 / end;
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

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  return (
    <LoginForm onSubmit={handleSubmit}>
      <label>
        <Label>Email</Label>
        <TextField autoFocus value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        <Label>Password</Label>
        <TextField type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <Button type="submit">Login</Button>
      {!!error && <Validation>{error}</Validation>}
    </LoginForm>
  )
}

export default Login
