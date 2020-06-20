import React, { useState, useEffect } from 'react'
import generateCode from './utils/generateCode'
import { Typography, Grid, Box, CircularProgress, Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { usePass } from './utils/pass'

const useStyles = makeStyles(theme => ({
  code: {
    letterSpacing: '0.2em',
    marginRight: '-0.2em',
    [theme.breakpoints.up('sm')]: {
      letterSpacing: '0.4em',
      marginRight: '-0.4em'
    },
    [theme.breakpoints.up('md')]: {
      letterSpacing: '1em',
      marginRight: '0',
      lineHeight: '1em'
    }
  }
}))

const Account = ({ account = {} }) => {
  const classes = useStyles()
  const [otp, setOtp] = useState('')
  const [remaining, setRemaining] = useState(0)
  const code = account ? account.code : null
  const pass = usePass()

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
  }, [remaining, code, pass])

  useEffect(() => {
    setTimeout(() => {
      if (code) {
        setOtp(generateCode(code))
      }
    }, 500)
  }, [code])

  return (
    <Grid container direction="column">
      <Box mt={5}>
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>
            <Typography variant="h6">{account.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" className={classes.code}>
              <Grid container alignItems="center">
                <Grid item>
                  {otp}
                </Grid>
                <Hidden smDown implementation="css">
                  <Grid item>
                    <CircularProgress value={remaining / 30 * 100} variant="static" />
                  </Grid>
                </Hidden>
              </Grid>
            </Typography>
          </Grid>
          <Hidden mdUp implementation="css">
            <Grid item>
              <CircularProgress value={remaining / 30 * 100} variant="static" />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Grid>
  )
}

export default Account
