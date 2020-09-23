export const notification = <Notifiable, Options>({
  channels,
}: {
  channels: ((notifiable: Notifiable, options: Options) => void)[]
}) => ({
  notify: (notifiable: Notifiable, options: Options) =>
    channels.map((channel) => channel(notifiable, options)),
})
