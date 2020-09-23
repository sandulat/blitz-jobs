import * as z from "zod"

export enum JobType {
  "FULLTIME" = "FULLTIME",
  "PARTTIME" = "PARTTIME",
}

export const jobTypeLabelMap = {
  [JobType.FULLTIME]: "Full-time",
  [JobType.PARTTIME]: "Part-time",
}

export const jobTypeEnum = z.union([z.literal(JobType.FULLTIME), z.literal(JobType.PARTTIME)])
