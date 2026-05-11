import type { AuthResponse, OAuthDiscordUserPayload } from '../../../types/Auth'

import { buildDiscordAvatar } from './buildDiscordAvatar'

const DISCORD_API_URL = 'https://discord.com/api'
export async function getDiscordUser(accessToken: string): Promise<AuthResponse['user']> {
  //tenemos que llamar a la API de discord xd
  const response = await fetch(`${DISCORD_API_URL}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed Discord account request')
  }

  const {
    id,
    avatar,
    email,
    username,
    global_name: globalName,
    discriminator
  } = (await response.json()) as OAuthDiscordUserPayload

  return {
    email,
    name: globalName ?? `${username}#${discriminator}`,
    id,
    role: 'admin',
    avatar: buildDiscordAvatar(id, avatar)
  }
}
