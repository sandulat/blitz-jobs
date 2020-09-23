import { Button } from "app/components/Button"
import { Card } from "app/components/Card"
import { Logo } from "app/components/Logo"
import { StyledLink } from "app/components/StyledLink"
import { Link } from "blitz"
import React from "react"
import { AuthHeading } from "./AuthHeading"
import { AuthSubheading } from "./AuthSubheading"
import { AuthWrapper } from "./AuthWrapper"

export const EmailConfirmationNotice = () => (
  <AuthWrapper>
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="text-center">
        <Link href="/" passHref>
          <a className="inline-block">
            <Logo className="w-auto h-12" />
          </a>
        </Link>
      </div>
      <AuthHeading>Welcome aboard</AuthHeading>
      <AuthSubheading>
        Already confirmed?{" "}
        <Link href="/login" passHref>
          <StyledLink>Login</StyledLink>
        </Link>
      </AuthSubheading>
    </div>
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <Card>
        <p className="text-center">
          You've successfully signed up. <br />
          We've sent you a confirmation email.
        </p>
        <br />
        <Link href="login">
          <Button full>Go to login</Button>
        </Link>
      </Card>
    </div>
  </AuthWrapper>
)
