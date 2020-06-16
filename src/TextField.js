import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  align-items: center;
`

const InputEl = styled.input`
  border-radius: 4px;
  border: 1px solid #aaa;
  padding: 8px;
  flex: 1 0 auto;
`

const Button = styled.button`
  background: transparent;
  border: none;
  flex: 0 1 auto;
`

const TextField = ({ type, ...props }) => {
  const [state, setState] = useState(type)

  useEffect(() => setState(type), [type])

  return (
    <Container>
      <InputEl type={state} {...props} />
      {type === 'password' && (
        <Button type="button" onClick={() => setState(type === state ? 'text' : type)}>
          {type === state ? 'Show' : 'Hide'}
        </Button>
      )}
    </Container>
  )
}

export default TextField
