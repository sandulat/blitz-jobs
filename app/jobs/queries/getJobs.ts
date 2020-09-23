import { PaginationInput, PaginationInputType } from "app/validations"
import db from "db"

export default async function getJobs(input: PaginationInputType) {
  const { skip, take } = PaginationInput.parse(input)

  const jobs = await db.job.findMany({
    skip,
    take,
    where: {
      publishedAt: {
        not: null,
      },
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
