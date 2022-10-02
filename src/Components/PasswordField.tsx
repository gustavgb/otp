import React, { useState } from 'react'
import { InputAdornment, IconButton, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface PasswordFieldProps {
  onChange: (value: string) => void
  value: string
  name?: string
  className?: string
  autoFocus?: boolean
  fullWidth?: boolean
  label?: string
}
const PasswordField = ({
  onChange,
  value,
  className = '',
  autoFocus = false,
  label = 'Password',
  fullWidth = false,
  name = undefined
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      className={className}
      label={label}
      autoFocus={autoFocus}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={e => onChange(e.target.value)}
      fullWidth={fullWidth}
      name={name}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={e => {
                e.preventDefault()
              }}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export default PasswordField
