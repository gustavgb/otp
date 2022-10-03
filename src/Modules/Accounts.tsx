import React from 'react'
import { ButtonBase, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material'
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
    <Grid container>
      {codes.map((account, index) => (
        <Grid item xs={12} key={`${account.name}-${index}`} sx={{ mb: 2 }}>
          <ButtonBase
            sx={{ width: '100%', display: 'block', textAlign: 'left' }}
            onClick={handleCopy(account.code)}
          >
            <Card>
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={(remaining / 30) * 100}
              />
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
  )
}

export default Accounts
