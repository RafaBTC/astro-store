const DISCORD_CDN_URL = 'https://cdn.discordapp.com'

export function buildDiscordAvatar(id: string, avatar: string | null): string {
  let avatarSrc = ''
  if (avatar) {
    avatarSrc = `${DISCORD_CDN_URL}/avatars/${id}/${avatar}.png?size=256`
  } else {
    const defaultAvatarIndex = (BigInt(id) >> 22n) % 6n
    avatarSrc = `${DISCORD_CDN_URL}/embed/avatars/${defaultAvatarIndex}.png`
  }

  return avatarSrc
}
