import React from 'react'
import { toggleAccountDeleted } from './utils/api'
import { Divider, Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Hidden, Drawer, useTheme } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: theme.mixins.drawer.width,
      flexShrink: 0
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: theme.mixins.drawer.width
  }
}));

const Accounts = ({ onSelect, accounts, selected, onChangeMobileOpen, mobileOpen }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()

  const activeAccounts = accounts.filter(account => !account.deleted)

  const handleSelectDrawerItem = (value) => {
    onSelect(value)
    onChangeMobileOpen(false)
  }

  const handleDelete = () => {
    if (selected) {
      const selectedAccount = accounts.find(account => account.id === selected)
      toggleAccountDeleted(selected)
        .then(() => {
          onSelect(null)
          enqueueSnackbar('Account deleted: ' + selectedAccount.name, { variant: 'success' })
        })
        .catch(err => {
          console.log(err)
          enqueueSnackbar(err.message, { variant: 'error' })
        })
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <Box p={2}>
        <Button
          onClick={() => handleSelectDrawerItem('new')}
          variant="contained"
          color="primary"
          fullWidth
        >
          Add account
        </Button>
      </Box>
      <Divider />
      <List>
        {activeAccounts.map((account) => (
          <ListItem button key={account.id} onClick={() => handleSelectDrawerItem(account.id)}>
            <ListItemText primary={account.name} />
            {selected === account.id && (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete()}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="Accounts">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={() => onChangeMobileOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default Accounts
