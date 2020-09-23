import { Role } from "app/users/role"
import { IdInput, IdInputType } from "app/validations"
import { SessionContext } from "blitz"
import db from "db"

export default async function publishJob(
  input: IdInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize(Role.ADMIN)

  const { id } = IdInput.parse(input)

  await db.job.update({
    where: {
      id,
    },
    data: {
      publishedAt: new Date(),
    },
  })
}
