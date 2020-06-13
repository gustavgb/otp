import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import generateCode from './generateCode'

const Container = styled.div`
  padding: 16px 0;
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
`

const Header = styled.p`
  margin-top: 0;
  font-weight: bold;
`

const Code = styled.p`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1rem;
`

const Account = ({ account = {} }) => {
  const [otp, setOtp] = useState('')
  const [refreshKey, setRefresh] = useState(0)

  useEffect(() => {
    setOtp(generateCode(account.code))
  }, [refreshKey, account.code])

  return (
    <Container>
      <Header>{account.name}</Header>
      <Code>{otp}</Code>
      <button onClick={() => setRefresh(Date.now())}>Refresh</button>
    </Container>
  )
}

export default Account