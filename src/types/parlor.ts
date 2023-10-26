import { type Prisma } from '@prisma/client'

export type ParlorWithGames = Prisma.ParlorGetPayload<{
  include: {
    sessions: {
      include: {
        games: true
      }
    }
  }
}>
