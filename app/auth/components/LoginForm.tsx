import React, { useRef } from "react"
import { AuthenticationError, Link } from "blitz"
import { TextField } from "app/components/TextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput, LoginInputType } from "app/auth/validations"
import { Card } from "app/components/Card"
import { StyledLink } from "app/components/StyledLink"
import { Logo } from "app/components/Logo"
import { AuthHeading } from "./AuthHeading"
import { AuthWrapper } from "./AuthWrapper"
import { AuthSubheading } from "./AuthSubheading"
import { UnconfirmedEmailError } from "app/errors/unconfirmedEmail"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const emailInputRef = useRef<HTMLInputElement>(null)

  return (
    <AuthWrapper>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/" passHref>
            <a className="inline-block">
              <Logo className="w-auto h-12" />
            </a>
          </Link>
        </div>

        <AuthHeading>Sign in to your account</AuthHeading>
        <AuthSubheading>
          Or{" "}
          <Link href="/signup" passHref>
            <StyledLink>create a new account for free</StyledLink>
          </Link>
        </AuthSubheading>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <Form<LoginInputType>
            submitText="Log in"
            schema={LoginInput}
            initialValues={{ email: undefined, password: undefined }}
            onSubmit={async (values, form) => {
              try {
                await login(values)
                props.onSuccess && props.onSuccess()
              } catch (error) {
                setTimeout(() => {
                  form.change("password", undefined)
                  form.resetFieldState("password")
                  emailInputRef.current?.focus()
                })

                switch (error.name) {
                  case AuthenticationError.name: {
                    return { [FORM_ERROR]: "Sorry, those credentials are invalid." }
                  }
                  case UnconfirmedEmailError.name: {
                    return { [FORM_ERROR]: "Please confirm your email first." }
                  }
                  default: {
                    return {
                      [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                    }
                  }
                }
              }
            }}
          >
            <TextField ref={emailInputRef} name="email" label="Email" placeholder="Email" />
            <div className="mt-6">
              <TextField name="password" label="Password" placeholder="Password" type="password" />
            </div>
          </Form>
        </Card>
      </div>
    </AuthWrapper>
  )
}

export default LoginForm
