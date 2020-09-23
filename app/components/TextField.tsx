import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import classNames from "classnames"
import { ErrorMessage } from "./ErrorMessage"
import { FieldErrorIcon } from "./FieldErrorIcon"
import { FieldLabel } from "./FieldLabel"

export interface TextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label?: string
  placeholder?: string
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, label, type, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { error, touched, submitFailed, submitError, submitting },
    } = useField(name)

    const errorMessage = Array.isArray(error) ? error[0] : error || submitError

    const hasError = touched && submitFailed && !!errorMessage

    const ariaErrorName = `${name}-error`

    return (
      <div {...outerProps}>
        {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            id={name}
            ref={ref}
            className={classNames(
              "block w-full pr-10 form-input sm:text-sm sm:leading-5 transition-all duration-200",
              {
                "text-red-900 placeholder-red-300 border-red-300 focus:border-red-300 focus:shadow-outline-red": hasError,
              }
            )}
            aria-invalid={hasError}
            disabled={submitting}
            aria-describedby={hasError ? ariaErrorName : undefined}
            type={type}
            {...input}
            {...props}
          />
          {hasError && <FieldErrorIcon />}
        </div>
        {hasError && (
          <div className="mt-2">
            <ErrorMessage error={errorMessage} ariaErrorName={ariaErrorName} />
          </div>
        )}
      </div>
    )
  }
)

export default TextField
