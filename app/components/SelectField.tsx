import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import classNames from "classnames"
import { ErrorMessage } from "./ErrorMessage"
import { FieldErrorIcon } from "./FieldErrorIcon"
import { FieldLabel } from "./FieldLabel"

export interface SelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  name: string
  label?: string
  placeholder?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  options: { value: string; label: string }[]
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ name, label, outerProps, options, ...props }, ref) => {
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
          <select
            id={name}
            ref={ref}
            aria-invalid={hasError}
            disabled={submitting}
            aria-describedby={hasError ? ariaErrorName : undefined}
            className={classNames(
              "form-select block w-full pl-3 pr-10 py-2 text-base leading-6 sm:text-sm sm:leading-5",
              {
                "text-red-900 placeholder-red-300 border-red-300 focus:border-red-300 focus:shadow-outline-red": hasError,
              }
            )}
            {...input}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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

export default SelectField
