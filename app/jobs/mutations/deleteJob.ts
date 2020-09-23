import { IdInput, IdInputType } from "app/validations"
import { SessionContext } from "blitz"
import db from "db"

export default async function deleteJob(
  input: IdInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { id } = IdInput.parse(input)

  await db.job.deleteMany({
    where: {
      id,
      userId: ctx.session!.userId,
    },
  })
}
