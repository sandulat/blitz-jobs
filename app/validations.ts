import * as z from "zod"

export const IdInput = z.object({
  id: z.number().positive().int(),
})

export type IdInputType = z.infer<typeof IdInput>

export const PaginationInput = z.object({
  skip: z.number().min(0).int(),
  take: z.number().min(0).int().max(100),
})

export type PaginationInputType = z.infer<typeof PaginationInput>
