import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PassProvider } from './pass'
import Login from './Login'
import { auth, streamAccounts } from './api'
import Accounts from './Accounts'
import Account from './Account'
import EnterPass from './EnterPass'
import AddAccount from './AddAccount'
import Toolbar from './Toolbar'

const Root = styled.main`
  display: grid;
  grid-template-columns: 20vw 1fr 20vw;
  grid-template-rows: 20vh 1fr 20vh;
  grid-template-areas: ". . ." ". main ." ". . .";
  background-color: #333;
  min-height: 100vh;

  @media (max-width: 680px) {
    grid-template-areas: "main main main" "main main main" "main main main";
  }
`

const Content = styled.div`
  grid-area: main;
  display: grid;
  grid-template-columns: 1fr 2fr [end];
  grid-template-rows: 1fr min-content [end];
  grid-template-areas: "sidebar content" "toolbar toolbar";
  gap: 16px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
  padding: 16px;
  max-height: 60vh;

  & > * {
    max-height: 100%;
    overflow-y: auto;
  }

  @media (max-width: 680px) {
    max-height: 100vh;
    grid-template-columns: 1fr [end];
    grid-template-rows: 1fr 2fr min-content [end];
    grid-template-areas: "content" "sidebar" "toolbar";
    border-radius: 0;
  }
`

function App () {
  const [pass, setPass] = useState(null)
  const [user, setUser] = useState(null)
  const [selected, setSelected] = useState(0)
  const [accounts, setAccounts] = useState([])
  const [ready, setReady] = useState(false)

  const selectedAccount = accounts.find((_, index) => index === selected)

  useEffect(() => {
    if (!pass) {
      return
    }

    try {
      const stream = streamAccounts(pass)
        .subscribe(setAccounts)

      return () => stream.unsubscribe()
    } catch (e) {
      console.log(e)
    }
  }, [setAccounts, pass, user])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
      setReady(true)

      if (!user) {
        window.sessionStorage.clear()
        setAccounts([])
        setSelected(0)
        setPass(null)
      }
    })
  }, [])

  if (!ready) {
    return null
  }

  return (
    <PassProvider value={pass}>
      <Root>
        <Content>
          {user
            ? pass
              ? (
                <>
                  <Accounts onSelect={setSelected} accounts={accounts} />
                  {selected === 'new'
                    ? <AddAccount onSelect={setSelected} />
                    : selectedAccount ? <Account account={selectedAccount} /> : null}
                </>
              )
              : (
                <EnterPass onSubmit={setPass} />
              )
            : (
              <Login />
            )}
          {user && <Toolbar user={user} />}
        </Content>
      </Root>
    </PassProvider>
  )
}

export default App
