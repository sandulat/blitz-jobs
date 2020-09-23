import React, { PropsWithoutRef } from "react"
import classNames from "classnames"

export interface AlertProps extends PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  variant?: "danger" | "success"
}

const DangerIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
)

const SuccessIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)

const iconMap = {
  success: <SuccessIcon />,
  danger: <DangerIcon />,
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, variant = "success", className, ...props }, ref) => {
    return (
      <div
        className={classNames("p-4 rounded-md", className, {
          "bg-red-50": variant === "danger",
          "bg-green-50": variant === "success",
        })}
        role="alert"
        ref={ref}
        {...props}
      >
        <div className="flex">
          <div
            className={classNames("flex-shrink-0", {
              "text-red-400": variant === "danger",
              "text-green-400": variant === "success",
            })}
          >
            {iconMap[variant]}
          </div>
          <div className="ml-3">
            <h3
              className={classNames("text-sm font-medium leading-5", {
                "text-red-800": variant === "danger",
                "text-green-800": variant === "success",
              })}
            >
              {children}
            </h3>
          </div>
        </div>
      </div>
    )
  }
)
