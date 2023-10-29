import { type Prisma } from '@prisma/client'

export type SessionWithDetails = Prisma.GameSessionGetPayload<{
  include: {
    rule: true,
    parlor: true,
    games: {
      include: {
        players: {
          include: {
            player: true
          }
        }
      },
    }
  }
}>
