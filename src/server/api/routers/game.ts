import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { OnlyIdObject } from "~/validations/common";
import {
  CreateGameFormSchema,
  EditGameFormSchema,
  OnlyYearObject,
} from "~/validations/game";

export const gameRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.game.findMany({
      include: {
        rule: true,
        parlor: true,
        tipResults: true,
        results: {
          include: {
            member: true,
          },
          orderBy: [{
            sequence: "asc",
          }, {
            member: {
              name: "desc",
            },
          }],
        },
      },
    });
  }),
  getById: publicProcedure.input(OnlyIdObject).query(({ ctx, input }) => {
    return ctx.db.game.findFirst({
      where: {
        id: input.id,
      },
      include: {
        results: {
          include: {
            member: true,
          },
          orderBy: [{
            sequence: "asc",
          }, {
            member: {
              name: "desc",
            },
          }],
        },
      },
    });
  }),
  getByYear: publicProcedure.input(OnlyYearObject).query(({ ctx, input }) => {
    let conditions = {}
    if (input.year) {
      conditions = {
        date: {
          gte: new Date(`${input.year}-01-01`),
          lt: new Date(`${input.year}-12-31`),
        }
      }
    }
    return ctx.db.game.findMany({
      include: {
        rule: true,
        parlor: true,
        tipResults: true,
        results: {
          include: {
            member: true,
          },
          orderBy: [{
            sequence: "asc",
          }, {
            member: {
              name: "desc",
            },
          }],
        },
      },
      where: conditions,
    });
  }),
  update: publicProcedure
    .input(EditGameFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.game.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
  create: publicProcedure
    .input(CreateGameFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.game.create({
        data: input,
      });
    }),
});
