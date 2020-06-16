import { authenticator } from 'otplib'

export default (secret) => authenticator.generate(secret)
