import React, { useState } from 'react'
import styled from 'styled-components'
import { PassProvider } from './pass'
import Login from './Login'
import { auth } from './api'

const Root = styled.main`
  padding: 20vh 20vw;
  background-color: #333;
  min-height: 100vh;
`

const Content = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
  padding: 16px;
`

function App () {
  const pass = useState(null)
  const [user, setUser] = useState(null)

  auth.onAuthStateChanged(user => {
    setUser(user)
  })

  return (
    <PassProvider value={pass}>
      <Root>
        <Content>
          {user
            ? (
              user.uid
            )
            : (
              <Login />
            )}
        </Content>
      </Root>
    </PassProvider>
  )
}

export default App
