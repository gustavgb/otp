import React from 'react'
import { Container, ListItemText, ListItem, List, ListItemSecondaryAction, IconButton, Paper, Divider } from '@material-ui/core'
import dateFormat from 'dateformat'
import RestoreIcon from '@material-ui/icons/RestoreFromTrash'
import { toggleAccountDeleted } from './utils/api'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const Trash = ({ accounts }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useHistory()

  const handleRestore = (id) => {
    if (id) {
      const selectedAccount = accounts.find(account => account.id === id)
      toggleAccountDeleted(id)
        .then(() => {
          push('/')
          enqueueSnackbar('Account restored: ' + selectedAccount.name, { variant: 'success' })
        })
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper>
        <List>
          {accounts.map((account, index) => (
            <React.Fragment key={account.id}>
              {index !== 0 && <Divider />}
              <ListItem>
                <ListItemText primary={account.name} secondary={`Deleted on: ${dateFormat(account.deleted)}`} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleRestore(account.id)}>
                    <RestoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  )
}

export default Trash
