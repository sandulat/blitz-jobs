import React, { PropsWithoutRef } from "react"

export interface StyledLinkProps extends PropsWithoutRef<JSX.IntrinsicElements["a"]> {}

export const StyledLink = React.forwardRef<HTMLAnchorElement, StyledLinkProps>(
  ({ children, ...props }, ref) => (
    <a
      ref={ref}
      className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
      {...props}
    >
      {children}
    </a>
  )
)
