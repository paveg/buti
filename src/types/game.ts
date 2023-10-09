import { type Game } from "@prisma/client";
import { type GameResultWithMember } from "~/types/gameResult";

export type GameWithResults = Game & { results: GameResultWithMember[] }
