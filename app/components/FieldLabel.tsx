import React, { PropsWithChildren } from "react"
import classNames from "classnames"

export interface FieldLabelProps extends PropsWithChildren<JSX.IntrinsicElements["label"]> {
  full?: boolean
  cursorPointer?: boolean
  variant?: "primary" | "white"
}
export const FieldLabel = ({ children, cursorPointer = false, ...props }: FieldLabelProps) => (
  <label
    className={classNames("block text-sm font-medium leading-5 text-gray-700 ", {
      "cursor-pointer": cursorPointer,
    })}
    {...props}
  >
    {children}
  </label>
)
