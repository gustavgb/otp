import React from 'react'
import {
  ListItemText,
  ListItem,
  List,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Divider
} from '@mui/material'
import dateFormat from 'dateformat'
import { RestoreFromTrash } from '@mui/icons-material'
import { toggleAccountDeleted } from '@/utils/api'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

const Trash = ({ accounts }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const handleRestore = id => {
    if (id) {
      const selectedAccount = accounts.find(account => account.id === id)
      toggleAccountDeleted(id).then(() => {
        navigate('/')
        enqueueSnackbar('Account restored: ' + selectedAccount.name, { variant: 'success' })
      })
    }
  }

  return (
    <Paper>
      <List>
        {accounts.length === 0 && (
          <ListItem>
            <ListItemText secondary="No accounts found in trash." />
          </ListItem>
        )}
        {accounts.map((account, index) => (
          <React.Fragment key={account.id}>
            {index !== 0 && <Divider />}
            <ListItem>
              <ListItemText
                primary={account.name}
                secondary={`Deleted on: ${dateFormat(account.deleted)}`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleRestore(account.id)}>
                  <RestoreFromTrash />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  )
}

export default Trash
