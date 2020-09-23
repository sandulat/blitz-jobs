import db from "db"
import { SessionContext } from "blitz"

export type CurrentUser = {
  id: number
  name: string | null
  email: string
  role: string
}

export default async function getCurrentUser(_ = null, ctx: { session?: SessionContext } = {}) {
  if (!ctx.session?.userId) return null

  const user = await db.user.findOne({
    where: { id: ctx.session!.userId },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}
