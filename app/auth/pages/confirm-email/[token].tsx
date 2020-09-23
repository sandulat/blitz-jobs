import React, { useEffect, useState } from "react"
import { AuthorizationError, BlitzPage, GetServerSideProps, useParam, useRouter } from "blitz"
import Layout from "app/layouts/Layout"
import { AuthWrapper } from "app/auth/components/AuthWrapper"
import { Logo } from "app/components/Logo"
import { AuthHeading } from "app/auth/components/AuthHeading"
import { AuthSubheading } from "app/auth/components/AuthSubheading"
import confirmEmail from "app/auth/mutations/confirmEmail"
import { ensureUnauthenticated } from "app/guards/ensureUnauthenticated"

export const getServerSideProps: GetServerSideProps = ensureUnauthenticated

const ConfirmEmail: BlitzPage = () => {
  const token = useParam("token")

  const router = useRouter()

  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    setTimeout(async () => {
      try {
        await confirmEmail({ token: token as string })

        router.push("/")
      } catch (e) {
        if (e.name === AuthorizationError.name) {
          setUnauthorized(true)
        }
      }
    }, 2000)
  }, [token, router])

  return (
    <AuthWrapper>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="w-auto h-12 mx-auto" />

        <AuthHeading>{unauthorized ? "Whoops 😳" : "Confirming your email"}</AuthHeading>
        <AuthSubheading>
          {unauthorized
            ? "It looks like this link is expired."
            : "Please wait a few moments while your email is being confirmed."}
        </AuthSubheading>
      </div>
    </AuthWrapper>
  )
}

ConfirmEmail.getLayout = (page) => <Layout title="Confirm Email">{page}</Layout>

export default ConfirmEmail
