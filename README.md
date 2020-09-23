# **Blitz.js Jobs**

The first-ever [Blitz.js job board](https://blitz-jobs.com/). This project is non-commercial, meaning that anyone can post jobs for free.

## Getting Started

Run your app in the development mode.

```
blitz start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/jobboard
MAIL_DRIVER=PREVIEW
MAIL_FROM_EMAIL="myemail@example.org"
MAIL_FROM_NAME="Blitz.js Jobs"
```

## Mail

The environment variable `MAIL_DRIVER` can be equal to one of these:

- `SMTP` - Basic SMTP driver. Requires these environment variables to be set:
  - `MAIL_HOST`
  - `MAIL_PORT`
  - `MAIL_USER`
  - `MAIL_PASS`
- `SENDGRID` - Sendgrid driver. Requires these environment variables to be set:
  - `MAIL_SENDGRID_KEY`
- `PREVIEW` - Browser preview driver.

Usage example:

```js
import { mail } from "app/mail/mail"

mail.send({
  subject: "Please confirm your email",
  to: "some@email.org",
  view: "auth/mail/user-confirmation",
  variables: { confirmationUrl: "https://confirmation.url/" },
})
```

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  build     Create a production build
  console   Run the Blitz console REPL
  db        Run database commands
  generate  Generate new files for your Blitz project
  help      display help for blitz
  start     Start a development server
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## To do

Contributions and suggestions of any kind are very welcome.

Here is a list of things that need to be developed:

- [ ] Forgot password system
- [ ] Tests
- [ ] Captcha (login, signup, post job)
