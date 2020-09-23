import React, { PropsWithoutRef } from "react"

export const AuthHeading = React.forwardRef<
  HTMLHeadingElement,
  PropsWithoutRef<JSX.IntrinsicElements["h2"]>
>(({ children, ...props }, ref) => (
  <h2
    ref={ref}
    className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900"
    {...props}
  >
    {children}
  </h2>
))
