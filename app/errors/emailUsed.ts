export class EmailUsedError extends Error {
  name = "EmailUsedError"

  email

  constructor({ email }) {
    super()

    this.email = email
  }
}
