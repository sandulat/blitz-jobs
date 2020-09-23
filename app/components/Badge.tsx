import React, { PropsWithoutRef } from "react"

export const Badge = React.forwardRef<
  HTMLSpanElement,
  PropsWithoutRef<JSX.IntrinsicElements["span"]>
>(({ children }, ref) => (
  <span
    ref={ref}
    className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
  >
    {children}
  </span>
))
