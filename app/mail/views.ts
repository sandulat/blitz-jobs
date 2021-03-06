import fs from "fs"
import path from "path"
import Handlebars from "handlebars"

const resolveView = (viewPath: string) => {
  const viewResolvedPath = path.resolve(`app/${viewPath}.html`)

  if (!fs.existsSync(viewResolvedPath)) {
    throw new Error(`Template "${viewResolvedPath}" doesn't exist.`)
  }

  return fs.readFileSync(viewResolvedPath, "utf8")
}

export const compileView = ({
  subject,
  view,
  variables,
}: {
  subject: string
  view: string
  variables: object
}) => {
  const content = resolveView(view)

  const layout = resolveView("mail/views/layout")

  const formattedContent = Handlebars.compile(content)(variables)

  return Handlebars.compile(layout)({
    subject,
    content: formattedContent,
  })
}
