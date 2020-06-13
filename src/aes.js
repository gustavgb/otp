import aes from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

export const encrypt = (message, pass) => aes.encrypt(message, pass).toString()
export const decrypt = (message, pass) => aes.decrypt(message, pass).toString(encUtf8)
