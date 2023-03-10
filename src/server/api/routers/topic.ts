import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [deletedNotesCount, deletedTopic] = await Promise.all([
        await ctx.prisma.note.deleteMany({
          where: {
            topicId: input.topicId,
          },
        }),
        await ctx.prisma.topic.delete({
          where: {
            id: input.topicId,
          },
        }),
      ]);

      return {
        deletedNotesCount,
        deletedTopic,
      };
    }),
});
