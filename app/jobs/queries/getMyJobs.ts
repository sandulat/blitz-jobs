import { PaginationInput, PaginationInputType } from "app/validations"
import { SessionContext } from "blitz"
import db from "db"

export default async function getMyJobs(
  input: PaginationInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { skip, take } = PaginationInput.parse(input)

  const jobs = await db.job.findMany({
    skip,
    take,
    where: {
      userId: ctx.session!.userId,
    },
  })

  const count = await db.job.count()

  const hasMore = typeof take === "number" ? skip + take < count : false

  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    jobs,
    nextPage,
    hasMore,
  }
}
