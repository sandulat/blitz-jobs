import { Mutator } from "final-form"
import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
import { Alert } from "./Alert"
import { Button } from "./Button"
export { FORM_ERROR } from "final-form"

type FormProps<FormValues> = {
  children: ReactNode
  submitText: string
  onSubmit: FinalFormProps<FormValues>["onSubmit"]
  initialValues?: FinalFormProps<FormValues>["initialValues"]
  schema?: z.ZodType<any, any>
  mutators?: { [key: string]: Mutator<FormValues> }
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

const errorMap: z.ZodErrorMap = (error, ctx) => {
  if (error.message) return { message: error.message }

  switch (error.code) {
    case z.ZodErrorCode.invalid_type:
      if (error.expected === "string" && error.received === "undefined") {
        return { message: "This field is required" }
      }
  }

  return { message: ctx.defaultError }
}

export function Form<FormValues extends Record<string, unknown>>({
  children,
  submitText,
  schema,
  initialValues,
  mutators,
  onSubmit,
  ...props
}: FormProps<FormValues>) {
  return (
    <FinalForm<FormValues>
      initialValues={initialValues}
      mutators={mutators}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values, { errorMap })
        } catch (error) {
          if (error instanceof z.ZodError) {
            return error.formErrors.fieldErrors
          }
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {submitError && (
            <Alert variant="danger" className="mb-4">
              {submitError}
            </Alert>
          )}

          {children}

          <div className="mt-6">
            <Button type="submit" full disabled={submitting}>
              {submitText}
            </Button>
          </div>
        </form>
      )}
    />
  )
}

export default Form
