import React from "react"

export const ErrorMessage = ({
  error,
  ariaErrorName,
}: {
  error: string
  ariaErrorName?: string
}) => (
  <p className="text-sm text-red-600" id={ariaErrorName}>
    {error}
  </p>
)
