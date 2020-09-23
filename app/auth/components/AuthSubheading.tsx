import React, { PropsWithoutRef } from "react"

export const AuthSubheading = React.forwardRef<
  HTMLHeadingElement,
  PropsWithoutRef<JSX.IntrinsicElements["p"]>
>(({ children, ...props }, ref) => (
  <p ref={ref} className="mt-2 text-sm leading-5 text-center text-gray-600" {...props}>
    {children}
  </p>
))
