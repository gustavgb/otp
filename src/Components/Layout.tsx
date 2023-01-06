import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export function RouteLayout() {
  return (
    <Container maxWidth="xs">
      <Box pt={2}>
        <Outlet />
      </Box>
    </Container>
  )
}

export function Layout({ children }) {
  return (
    <Container maxWidth="xs">
      <Box pt={2}>{children}</Box>
    </Container>
  )
}
