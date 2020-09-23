import { SessionContext } from "blitz"
import db from "db"
import { getActiveTags } from "../tags"
import { SubmitJobInput, SubmitJobInputType } from "../validations"

export default async function createJob(
  input: SubmitJobInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { tags, ...parsedInput } = SubmitJobInput.parse(input)

  const job = await db.job.create({
    data: {
      ...parsedInput,
      tags: getActiveTags(tags),
      user: {
        connect: {
          id: ctx.session!.userId,
        },
      },
    },
  })

  return job
}
