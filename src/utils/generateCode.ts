import { authenticator } from 'otplib'

export default function generateCode(secret) {
  return authenticator.generate(secret)
}
