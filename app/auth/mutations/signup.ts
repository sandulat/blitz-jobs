import db from "db"
import { ensureUserEmailNotUsed, hashPassword } from "app/auth/auth-utils"
import { SignupInput, SignupInputType } from "app/auth/validations"
import { nanoid } from "nanoid"
import { userConfirmationNotification } from "../notifications/userConfirmation"

export default async function signup(input: SignupInputType) {
  const { email, password } = SignupInput.parse(input)

  const formattedEmail = email.toLowerCase()

  await ensureUserEmailNotUsed(formattedEmail)

  const hashedPassword = await hashPassword(password)

  const user = await db.user.create({
    data: { email: formattedEmail, hashedPassword, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  })

  const confirmationToken = nanoid(100)

  await userConfirmationNotification.notify(user, { token: confirmationToken })

  await db.userConfirmationToken.create({
    data: {
      token: confirmationToken,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })
}
