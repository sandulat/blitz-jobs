import { getSessionContext } from "@blitzjs/server"
import { Role } from "app/users/role"
import { GetServerSideProps } from "blitz"

export const ensureHasRole = async ({
  req,
  res,
  role,
}: Parameters<GetServerSideProps>[0] & { role: Role }) => {
  const session = await getSessionContext(req, res)

  if (!session.userId || !session.roles.includes(role)) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
  }

  return {
    props: {},
  }
}
