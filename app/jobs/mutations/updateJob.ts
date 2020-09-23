import { AuthorizationError, SessionContext } from "blitz"
import db from "db"
import { getActiveTags } from "../tags"
import { UpdateJobInput, UpdateJobInputType } from "../validations"

export default async function updateJob(
  input: UpdateJobInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { tags, id, ...parsedInput } = UpdateJobInput.parse(input)

  const [job] = await db.job.findMany({
    where: {
      id,
      userId: ctx.session!.userId,
    },
  })

  if (!job) {
    throw new AuthorizationError()
  }

  await db.job.updateMany({
    where: {
      id,
      userId: ctx.session!.userId,
    },
    data: {
      ...parsedInput,
      tags: getActiveTags(tags),
    },
  })
}
