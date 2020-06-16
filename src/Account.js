import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import generateCode from './utils/generateCode'

const Container = styled.div`
  padding: 16px 0;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  place-items: center;
  grid-area: content;

  & > * {
    margin: 0;
  }
`

const Header = styled.p`
  margin-top: 0;
  font-weight: bold;
`

const Code = styled.p`
  font-size: 2rem;
  font-weight: bold;
  font-family: monospace;
  letter-spacing: 1rem;
  margin-right: -1rem;
`

const Validation = styled.div`
  color: red;
`

const Account = ({ account = {} }) => {
  const [otp, setOtp] = useState('')
  const [remaining, setRemaining] = useState(0)
  const code = account ? account.code : null

  useEffect(() => {
    let unmounted = false
    if (remaining <= 0) {
      if (code) {
        setOtp(generateCode(code))
      }

      const time = 30 - Math.floor((Date.now() % 30000) / 1000)
      setRemaining(time)
    } else {
      setTimeout(() => {
        if (!unmounted) {
          setRemaining(remaining - 1)
        }
      }, 1000)
    }

    return () => {
      unmounted = true
    }
  }, [remaining, code])

  return (
    <Container>
      <Header>{account.name}</Header>
      <Code>{otp}</Code>
      <Validation>{remaining} seconds left</Validation>
    </Container>
  )
}

export default Account
