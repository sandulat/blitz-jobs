import { IdInput } from "app/validations"
import * as z from "zod"
import { jobTypeEnum } from "./jobType"
import { Tag, tagLabelMap } from "./tags"

export const SubmitJobInput = z.object({
  company: z.string().max(40),
  position: z.string().max(40),
  tags: z
    .object({
      [Tag.BLITZ]: z.boolean(),
      [Tag.REACT]: z.boolean(),
      [Tag.AWS]: z.boolean(),
      [Tag.VERCEL]: z.boolean(),
      [Tag.NEXT]: z.boolean(),
      [Tag.RENDER]: z.boolean(),
    })
    .refine((tags) => tags[Tag.BLITZ] === true, {
      message: `The ${tagLabelMap[Tag.BLITZ]} tag is required`,
      path: [`tags.${Tag.BLITZ}`],
    }),
  type: jobTypeEnum,
  location: z.string().max(30),
  url: z.string().url(),
})

export type SubmitJobInputType = z.infer<typeof SubmitJobInput>

export const UpdateJobInput = SubmitJobInput.merge(IdInput)

export type UpdateJobInputType = z.infer<typeof UpdateJobInput>

export const SingleJobInput = z.object({
  id: z.number().positive().int(),
})

export type SingleJobInputType = z.infer<typeof SingleJobInput>
