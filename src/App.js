import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { PassProvider } from './utils/pass'
import Login from './Login'
import { auth, streamAccounts } from './utils/api'
import Account from './Account'
import EnterPass from './EnterPass'
import AddAccount from './AddAccount'
import clsx from 'clsx';
import Accounts from './Accounts';
import LogoutIcon from '@material-ui/icons/ExitToApp'
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Trash from './Trash';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.mixins.drawer.width}px)`,
      marginLeft: theme.mixins.drawer.width
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  }
}));

const App = () => {
  const [pass, setPass] = useState(null)
  const [user, setUser] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [ready, setReady] = useState(false)
  const { push } = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const uid = user ? user.uid : null

  useEffect(() => {
    if (!pass) {
      return
    }

    try {
      const stream = streamAccounts(pass)
        .subscribe(res => {
          setAccounts(res)
        })

      return () => stream.unsubscribe()
    } catch (e) {
      console.log(e)
      enqueueSnackbar(e.message, { variant: 'error' })
    }
  }, [setAccounts, pass, user, enqueueSnackbar])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
      setReady(true)

      if (!user) {
        setAccounts([])
        push('/')
        setPass(null)
      }
    })
  }, [push])

  if (!ready) {
    return null
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <PassProvider value={pass}>
      <div className={classes.root}>
        <AppBar position="fixed" className={clsx(!!pass && classes.appBar)}>
          <Toolbar>
            {!!pass && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap className={classes.title}>
              One Time Passwords
            </Typography>
            {user && (
              <>
                <Typography variant="body1" noWrap color="inherit">
                  {user.email}
                </Typography>
                <IconButton
                  color="inherit"
                  aria-label="Logout"
                  edge="end"
                  onClick={() => auth.signOut()}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
        {!!pass && (
          <Route
            path="/:id?"
            render={({ match: { params: { id } } }) => (
              <Accounts mobileOpen={mobileOpen} onChangeMobileOpen={setMobileOpen} accounts={accounts} selected={id} />
            )}
          />
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {user && pass && (
            <Switch>
              <Route path="/new" render={() => <AddAccount />} />
              <Route path="/trash" render={() => <Trash accounts={accounts.filter(account => account.deleted)} />} />
              <Route
                path="/:id"
                render={({ match: { params: { id } } }) => <Account key={id} account={accounts.find(account => account.id === id)} />}
              />
            </Switch>
          )}
          {user && !pass && (
            <EnterPass onSetPass={setPass} uid={uid} />
          )}
          {!user && (
            <Login />
          )}
        </main>
      </div>
    </PassProvider>
  );
}

export default App;
