import React, { PropsWithoutRef } from "react"
import classNames from "classnames"

export interface ButtonProps extends PropsWithoutRef<JSX.IntrinsicElements["button"]> {
  full?: boolean
  variant?: "primary" | "white" | "danger"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, full = false, className, disabled, variant = "primary", ...props }, ref) => (
    <span
      className={classNames(
        "rounded-md shadow-sm",
        {
          "block w-full": full,
          "inline-flex": !full,
        },
        className
      )}
    >
      <button
        ref={ref}
        className={classNames(
          "flex justify-center w-full px-4 py-2 text-sm font-medium transition duration-150 ease-in-out border rounded-md focus:outline-none",
          {
            "border-transparent text-white bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700":
              variant === "primary" && !disabled,
            "border-transparent text-white bg-red-600 hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red active:bg-red-700":
              variant === "danger" && !disabled,
            "border-transparent text-gray-500 bg-gray-200":
              (variant === "primary" || variant === "danger") && disabled,
            "border-gray-300 text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50":
              variant === "white" && !disabled,
            "border-gray-200 text-gray-400 bg-gray-100": variant === "white" && disabled,
            "cursor-not-allowed": disabled,
          }
        )}
        aria-disabled={disabled}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </span>
  )
)
