import React from 'react'
import { Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material'
import useCodes from '@utils/useCodes'

interface AccountsProps {
  accounts: Account[]
}
const Accounts = ({ accounts }: AccountsProps) => {
  const [codes, remaining] = useCodes(accounts)

  return (
    <Grid container>
      {codes.map((account, index) => (
        <Grid item xs={12} key={`${account.name}-${index}`} sx={{ mb: 2 }}>
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
        </Grid>
      ))}
    </Grid>
  )
}

export default Accounts
