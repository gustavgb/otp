import React, { useState, useEffect } from 'react'
import { PassProvider } from './utils/pass'
import Login from '@Modules/Login'
import { streamAccounts, watchUser } from './utils/api'
import EnterPass from '@Modules/EnterPass'
import AddAccount from '@Modules/AddAccount'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Trash from '@Modules/Trash'
import styled from '@emotion/styled'
import CustomAppBar from '@Components/AppBar'
import Accounts from '@Modules/Accounts'
import EditAccounts from '@Modules/Edit'
import ExportAccounts from '@Modules/Export'
import { RouteLayout, Layout } from '@Components/Layout'

const Root = styled.div``

const App = () => {
  const [pass, setPass] = useState(null)
  const [user, setUser] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [trash, setTrash] = useState([])
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const uid = user ? user.uid : null

  const loggedIn = !!user
  const vaultUnlocked = !!user && !!pass

  useEffect(() => {
    if (!pass) {
      return
    }

    try {
      const stream = streamAccounts(pass).subscribe(res => {
        setAccounts(res.accounts)
        setTrash(res.trash)
      })

      return () => stream.unsubscribe()
    } catch (e) {
      console.log(e)
      enqueueSnackbar(e.message, { variant: 'error' })
    }
  }, [setAccounts, pass, enqueueSnackbar])

  useEffect(() => {
    return watchUser(user => {
      setUser(user)
      setReady(true)

      if (!user) {
        setAccounts([])
        navigate('/')
        setPass(null)
      }
    })
  }, [navigate])

  if (!ready) {
    return null
  }

  return (
    <PassProvider value={pass}>
      <Root>
        <CustomAppBar
          loggedIn={loggedIn}
          vaultUnlocked={vaultUnlocked}
          username={user ? user.email : ''}
        />
        {vaultUnlocked && (
          <Routes>
            <Route element={<RouteLayout />}>
              <Route path="/new" element={<AddAccount />} />
              <Route path="/trash" element={<Trash accounts={trash} />} />
              <Route path="/edit" element={<EditAccounts accounts={accounts} />} />
              <Route path="/export" element={<ExportAccounts accounts={accounts} />} />
            </Route>
            <Route index element={<Accounts accounts={accounts} />} />
          </Routes>
        )}
        {loggedIn && !vaultUnlocked && (
          <Layout>
            <EnterPass onSetPass={setPass} uid={uid} />
          </Layout>
        )}
        {!loggedIn && (
          <Layout>
            <Login />
          </Layout>
        )}
      </Root>
    </PassProvider>
  )
}

export default App
