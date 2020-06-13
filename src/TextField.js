import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

const InputEl = styled.input`
  border-radius: 4px;
  border: 1px solid #aaa;
  padding: 8px;
`

const Button = styled.button`
  background: transparent;
  border: none;
`

const TextField = ({ type, ...props }) => {
  const [state, setState] = useState(type)

  useEffect(() => setState(type), [type])

  return (
    <>
      <InputEl type={state} {...props} />
      {type === 'password' && (
        <Button type="button" onClick={() => setState(type === state ? 'text' : type)}>
          {type === state ? 'Show' : 'Hide'}
        </Button>
      )}
    </>
  )
}

export default TextField
