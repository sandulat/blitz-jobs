import { User } from "@prisma/client"
import { mail } from "app/mail/mail"
import { notification } from "app/notifications/notification"

export const userConfirmationNotification = notification<Pick<User, "email">, { token: string }>({
  channels: [
    (notifiable, options) =>
      mail.send({
        subject: "Please confirm your email",
        to: notifiable.email,
        view: "auth/mail/user-confirmation",
        variables: { confirmationUrl: `${process.env.APP_URL}/confirm-email/${options.token}` },
      }),
  ],
})
