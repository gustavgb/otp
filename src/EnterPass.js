import React, { useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  padding: 10px;
`

const Button = styled.button``

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: grid;
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

function EnterPass ({ onSubmit }) {
  const [pass, setPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(pass)
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Row>
        <Input
          value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder="Enter passphrase"
          autoFocus
          type="password"
        />
        <Button type="submit">
          Done
        </Button>
      </Row>
    </Container>
  )
}

export default EnterPass
