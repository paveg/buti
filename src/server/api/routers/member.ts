import { z } from "zod";
import { MemberFormSchema } from "~/components/forms/memberForm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const memberRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.member.findMany({
      include: {
        results: true,
        tipResults: true,
      },
    });
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.member.findUnique({
        include: {
          results: {
            include: {
              game: {
                include: {
                  results: {
                    orderBy: {
                      sequence: "asc",
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          id: `${input.id}`,
        },
      });
    }),
  create: publicProcedure.input(MemberFormSchema).mutation(({ ctx, input }) => {
    const newMember = ctx.db.member.create({
      data: input,
    });

    return newMember;
  }),
  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.member.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
