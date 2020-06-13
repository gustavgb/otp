import { authenticator } from 'otplib'

export default (secret) => {
  const token = authenticator.generate(secret)

  return token
}
