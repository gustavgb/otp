import React from 'react'
import styled from 'styled-components'
import plus from './plus.svg'

const Sidebar = styled.div`
  border-right: 1px solid #ddd;
  padding-right: 16px;
  grid-area: sidebar;

  @media (max-width: 680px) {
    border-top: 1px solid #ddd;
    border-right: none;
  }
`

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-size: 1rem;
`

const AddButton = styled.button`
  border: none;
  background-image: url(${plus});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 1em;
  height: 1em;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity .5s linear;
  margin: 1em;

  &:hover {
    opacity: 1;
  }
`

const AccountItem = styled.button`
  font-size: 1rem;
  padding: 1rem;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  background-color: white;
  transition: all .5s ease-out;
  border: none;
  border-bottom: 1px solid #ddd;
  width: 100%;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }

  &:focus {
    outline: none;
  }
`

const Accounts = ({ onSelect, accounts }) => {
  return (
    <Sidebar>
      <Toolbar>
        Accounts
        <AddButton onClick={() => onSelect('new')} />
      </Toolbar>
      {accounts.map((account, index) => (
        <AccountItem key={account.id} onClick={() => onSelect(index)}>
          {account.name}
        </AccountItem>
      ))}
    </Sidebar>
  )
}

export default Accounts
