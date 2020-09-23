import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { ErrorMessage } from "./ErrorMessage"
import { FieldLabel } from "./FieldLabel"

export interface CheckboxFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ name, label, type, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { error, touched, submitFailed, submitError, submitting },
    } = useField(name, {
      type: "checkbox",
    })

    const errorMessage = Array.isArray(error) ? error[0] : error || submitError

    const hasError = touched && submitFailed && !!errorMessage

    const ariaErrorName = `${name}-error`

    return (
      <div {...outerProps}>
        <div className="flex items-center">
          <input
            id={name}
            ref={ref}
            type="checkbox"
            aria-invalid={hasError}
            disabled={props.disabled || submitting}
            aria-describedby={hasError ? ariaErrorName : undefined}
            className="w-4 h-4 mr-2 text-indigo-600 transition duration-150 ease-in-out cursor-pointer form-checkbox disabled:opacity-50"
            {...input}
            {...props}
          />
          {label && (
            <FieldLabel htmlFor={name} cursorPointer onClick={() => input.onFocus()}>
              {label}
            </FieldLabel>
          )}
          {props.disabled && (
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 ml-1 text-indigo-900 text-opacity-25"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
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

export default CheckboxField
