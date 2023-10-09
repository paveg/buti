import { type GameResult, type Member } from "@prisma/client";


export type GameResultWithMember = GameResult & { member: Member }
