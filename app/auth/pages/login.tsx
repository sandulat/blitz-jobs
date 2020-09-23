import React, { useEffect } from "react"
import { useRouter, BlitzPage, GetServerSideProps } from "blitz"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { ensureUnauthenticated } from "app/guards/ensureUnauthenticated"

export const getServerSideProps: GetServerSideProps = ensureUnauthenticated

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm onSuccess={() => router.push("/")} />
    </div>
  )
}

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
