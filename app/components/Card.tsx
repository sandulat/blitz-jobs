import React, { PropsWithoutRef, ReactNode } from "react"

export const Card = React.forwardRef<HTMLDivElement, PropsWithoutRef<JSX.IntrinsicElements["div"]>>(
  ({ children }: { children: ReactNode }, ref) => (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
)
