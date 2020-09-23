import * as z from "zod"

export const SignupInput = z
  .object({
    email: z.string().email(),
    password: z.string().max(100),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  })

export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type LoginInputType = z.infer<typeof LoginInput>

export const EmailConfirmationInput = z.object({
  token: z.string(),
})

export type EmailConfirmationInputType = z.infer<typeof EmailConfirmationInput>
