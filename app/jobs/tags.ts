export enum Tag {
  "BLITZ" = "BLITZ",
  "REACT" = "REACT",
  "AWS" = "AWS",
  "VERCEL" = "VERCEL",
  "NEXT" = "NEXT",
  "RENDER" = "RENDER",
}

export const tagLabelMap = {
  [Tag.BLITZ]: "Blitz.js",
  [Tag.REACT]: "React",
  [Tag.AWS]: "AWS",
  [Tag.VERCEL]: "Vercel",
  [Tag.NEXT]: "Next.js",
  [Tag.RENDER]: "Render",
}

export const getActiveTags = (tags?: { [key in Tag]: boolean }) =>
  tags
    ? Object.keys(tags).reduce((result, tag: Tag) => {
        if (tags[tag]) {
          result.push(tag)
        }

        return result
      }, [] as Tag[])
    : null
