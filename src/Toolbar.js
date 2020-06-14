import React from 'react'
import { auth } from './api'
import styled from 'styled-components'

const Row = styled.div`
  grid-area: toolbar;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`

const Button = styled.button``

const User = styled.p`
  margin: 0;
  color: #aaa;
`

const Toolbar = ({ user }) => {
  return (
    <Row>
      <User>{user.email}</User>
      <Button onClick={() => auth.signOut()}>Sign out</Button>
    </Row>
  )
}

export default Toolbar
