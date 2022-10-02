import generateCode from '@utils/generateCode'
import { useCallback, useEffect, useState } from 'react'

function getTime() {
  return 30 - Math.floor((Date.now() % 30000) / 1000)
}

export default function useCodes(accounts): [Account[], number] {
  const [codes, setCodes] = useState<Account[]>([])
  const [remaining, setRemaining] = useState(0)

  const updateCodes = useCallback(() => {
    setCodes(
      accounts.map(account => {
        if (account.code) {
          return {
            ...account,
            code: generateCode(account.code)
          }
        }
        return {
          ...account,
          code: 'Invalid'
        }
      })
    )
  }, [accounts])

  useEffect(() => {
    let unmounted = false

    const then = getTime()
    setTimeout(() => {
      if (!unmounted) {
        const now = getTime()
        setRemaining(now)

        if (now > then) {
          updateCodes()
        }
      }
    }, 1000)

    return () => {
      unmounted = true
    }
  }, [updateCodes, remaining])

  useEffect(() => {
    setTimeout(() => {
      updateCodes()
      setRemaining(getTime())
    }, 150)
  }, [updateCodes])

  return [codes, remaining]
}
