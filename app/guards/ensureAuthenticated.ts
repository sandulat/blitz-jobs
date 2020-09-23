import { getSessionContext } from "@blitzjs/server"
import { GetServerSideProps } from "blitz"

export const ensureAuthenticated = async ({ req, res }: Parameters<GetServerSideProps>[0]) => {
  const session = await getSessionContext(req, res)

  if (!session.userId) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
  }

  return {
    props: {},
  }
}
