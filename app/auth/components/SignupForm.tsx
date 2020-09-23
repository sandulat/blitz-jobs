import React, { useRef } from "react"
import { Link } from "blitz"
import { TextField } from "app/components/TextField"
import { Form, FORM_ERROR } from "app/components/Form"
import signup from "app/auth/mutations/signup"
import { SignupInput, SignupInputType } from "app/auth/validations"
import { Card } from "app/components/Card"
import { StyledLink } from "app/components/StyledLink"
import { Logo } from "app/components/Logo"
import { EmailUsedError } from "app/errors/emailUsed"
import { AuthHeading } from "./AuthHeading"
import { AuthWrapper } from "./AuthWrapper"
import { AuthSubheading } from "./AuthSubheading"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
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

        <AuthHeading>Sign up for free</AuthHeading>
        <AuthSubheading>
          Already have an account?{" "}
          <Link href="/login" passHref>
            <StyledLink>Login</StyledLink>
          </Link>
        </AuthSubheading>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <Form<SignupInputType>
            submitText="Sign up"
            schema={SignupInput}
            initialValues={{ email: undefined, password: undefined, passwordConfirm: undefined }}
            onSubmit={async (values, form) => {
              try {
                await signup(values)
                props.onSuccess && props.onSuccess()
              } catch (error) {
                setTimeout(() => {
                  form.change("password", undefined)
                  form.change("passwordConfirm", undefined)
                  form.resetFieldState("password")
                  form.resetFieldState("passwordConfirm")
                  emailInputRef.current?.focus()
                })

                switch (error.name) {
                  case EmailUsedError.name: {
                    return { [FORM_ERROR]: `The email ${values.email} is already being used.` }
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
            <div className="mt-6">
              <TextField
                name="passwordConfirm"
                label="Repeat Password"
                placeholder="Repeat Password"
                type="password"
              />
            </div>
          </Form>
        </Card>
      </div>
    </AuthWrapper>
  )
}

export default SignupForm
