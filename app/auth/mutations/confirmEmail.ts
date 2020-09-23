import db from "db"
import { AuthorizationError, SessionContext } from "blitz"
import { EmailConfirmationInputType, EmailConfirmationInput } from "app/auth/validations"

export default async function confirmEmail(
  input: EmailConfirmationInputType,
  ctx: { session?: SessionContext } = {}
) {
  const { token } = EmailConfirmationInput.parse(input)

  const userConfirmationToken = await db.userConfirmationToken.findOne({
    where: {
      token,
    },
    select: {
      id: true,
      userId: true,
    },
  })

  if (!userConfirmationToken) {
    throw new AuthorizationError()
  }

  const user = await db.user.update({
    where: {
      id: userConfirmationToken.userId,
    },
    data: {
      confirmedAt: new Date(),
    },
  })

  await db.userConfirmationToken.delete({
    where: {
      id: userConfirmationToken.id,
    },
  })

  await ctx.session!.create({ userId: user.id, roles: [user.role] })

  return user
}
