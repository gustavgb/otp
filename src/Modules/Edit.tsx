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
import { Delete } from '@mui/icons-material'
import { toggleAccountDeleted } from '@/utils/api'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

const EditAccounts = ({ accounts }) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const handleDelete = id => {
    if (id) {
      const selectedAccount = accounts.find(account => account.id === id)
      toggleAccountDeleted(id)
        .then(() => {
          navigate('/')
          enqueueSnackbar('Account deleted: ' + selectedAccount.name, { variant: 'success' })
        })
        .catch(err => {
          console.log(err)
          enqueueSnackbar(err.message, { variant: 'error' })
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
                secondary={`Created on: ${dateFormat(account.createdAt)}`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleDelete(account.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  )
}

export default EditAccounts
