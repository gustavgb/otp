import React from 'react'
import { auth } from './utils/api'
import styled from 'styled-components'

const Row = styled.div`
  grid-area: toolbar;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
`

const Button = styled.button`
  background: transparent;
  border: none;
  text-decoration: underline;
  color: #aaa;
  cursor: pointer;
  margin-left: 16px;
`

const User = styled.p`
  margin: 0;
  color: #aaa;
  flex: 1 0 auto;
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
