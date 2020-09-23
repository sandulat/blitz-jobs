import React, { PropsWithoutRef } from "react"

export const AuthWrapper = React.forwardRef<
  HTMLDivElement,
  PropsWithoutRef<JSX.IntrinsicElements["h2"]>
>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8"
    {...props}
  >
    {children}
  </div>
))
