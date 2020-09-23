import { SessionContext } from "blitz"
import db from "db"
import { SingleJobInput, SingleJobInputType } from "../validations"

export default async function getMyJob(
  input: SingleJobInputType,
  ctx: { session?: SessionContext } = {}
) {
  const { id } = SingleJobInput.parse(input)

  ctx.session!.authorize()

  const [job] = await db.job.findMany({
    where: {
      id,
      userId: ctx.session!.userId,
    },
    select: {
      id: true,
      company: true,
      position: true,
      tags: true,
      type: true,
      location: true,
      url: true,
    },
    take: 1,
  })

  return job || null
}
