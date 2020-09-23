import React, { useState } from "react"
import { BlitzPage, GetServerSideProps } from "blitz"
import Layout from "app/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { EmailConfirmationNotice } from "../components/EmailConfirmationNotice"
import { ensureUnauthenticated } from "app/guards/ensureUnauthenticated"

export const getServerSideProps: GetServerSideProps = ensureUnauthenticated

const SignupPage: BlitzPage = () => {
  const [signedUp, setSignedUp] = useState(false)

  return (
    <div>
      {!signedUp ? <SignupForm onSuccess={() => setSignedUp(true)} /> : <EmailConfirmationNotice />}
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
