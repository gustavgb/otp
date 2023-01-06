import React from 'react'
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Container,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material'
import useCodes from '@utils/useCodes'
import { useSnackbar } from 'notistack'

interface AccountsProps {
  accounts: Account[]
}
const Accounts = ({ accounts }: AccountsProps) => {
  const [codes, remaining] = useCodes(accounts)
  const { enqueueSnackbar } = useSnackbar()

  const handleCopy = code => () => {
    navigator.clipboard.writeText(code)
    enqueueSnackbar('Copied to clipboard 👍', { variant: 'success' })
  }

  return (
    <>
      <Box position="fixed" width="100%" zIndex={100}>
        <LinearProgress variant="determinate" value={(remaining / 30) * 100} color="secondary" />
      </Box>
      <Box pt={2}>
        <Container maxWidth="xs">
          <Grid container>
            {codes.map((account, index) => (
              <Grid item xs={12} key={`${account.name}-${index}`} sx={{ mb: 2 }}>
                <ButtonBase
                  sx={{ width: '100%', display: 'block', textAlign: 'left' }}
                  onClick={handleCopy(account.code)}
                >
                  <Card>
                    <CardContent>
                      <Typography variant="h5">{account.name}</Typography>
                      <Typography variant="h4" component="div" fontWeight="bold">
                        {account.code}
                      </Typography>
                    </CardContent>
                  </Card>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Accounts
