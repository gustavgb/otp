import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import plus from './assets/plus.svg'
import more from './assets/more.svg'
import { toggleAccountDisabled } from './utils/api'
import * as clipboard from 'clipboard-polyfill/dist/clipboard-polyfill.promise'

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

const AccountItem = styled.div`
  text-align: center;
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
  position: relative;
  opacity: ${props => props.disabled ? 0.3 : 1};

  &:hover {
    background-color: #efefef;
  }

  &:focus {
    outline: none;
  }
`

const MoreOptions = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  background-image: url(${more});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  z-index: 10;

  &:hover {
    background-color: #ddd;
  }
`

const Menu = styled.div.attrs(props => ({
  style: {
    top: `${props.pos.y}px`,
    left: `${props.pos.x}px`
  }
}))`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);

  position: fixed;
  z-index: 20;
  padding: 0 5px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const MenuItem = styled.button`
  padding: 5px;
  background-color: transparent;
  border: none;
  text-align: left;

  &:hover {
    background-color: #eee;
  }
`

const Accounts = ({ onSelect, accounts }) => {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [selected, setSelected] = useState(null)
  const menuIsOpen = !!menuAnchor
  const menuRef = useRef(null)

  const handleMoreOptions = (e, accountId) => {
    e.stopPropagation()

    setSelected(accountId)

    const rect = e.currentTarget.getBoundingClientRect()

    setMenuAnchor({
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    })
  }

  const handleDisable = () => {
    if (selected) {
      toggleAccountDisabled(selected)
        .then(() => {
          setMenuAnchor(null)
          onSelect(null)
        })
    }
  }

  const handleCopy = () => {
    if (selected) {
      clipboard.writeText(accounts.find(account => account.id === selected).code)
        .then(() => setMenuAnchor(null))
    }
  }

  useEffect(() => {
    const handler = e => {
      if (menuIsOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAnchor(null)
      }
    }

    window.addEventListener('click', handler)

    return () => window.removeEventListener('click', handler)
  }, [menuIsOpen])

  return (
    <Sidebar>
      <Toolbar>
        Accounts
        <AddButton onClick={() => onSelect('new')} />
      </Toolbar>
      {accounts.map((account) => (
        <AccountItem key={account.id} onClick={() => onSelect(account.id)} disabled={account.disabled}>
          {account.name}
          <MoreOptions onClick={e => handleMoreOptions(e, account.id)} />
        </AccountItem>
      ))}
      {menuIsOpen && (
        <Menu pos={menuAnchor} ref={menuRef}>
          <MenuItem onClick={handleCopy}>Copy secret code</MenuItem>
          <MenuItem onClick={handleDisable}>Enable/Disable</MenuItem>
        </Menu>
      )}
    </Sidebar>
  )
}

export default Accounts
