import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ExportAccounts({ accounts }) {
  const [plain, setPlain] = useState('')

  useEffect(() => {
    setPlain(accounts.map(account => `${account.name}: ${account.code}`).join('\n\n'))
  }, [accounts])

  return <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{plain}</Typography>
}
