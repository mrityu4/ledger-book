import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({ take: 100 });
  }),
  add: privateProcedure
    .input(
      z.object({
        doneAt: z.string().datetime(),
        recipient: z.string(),
        amount: z
          .number({
            required_error: "Amount is required",
            invalid_type_error: "Amount must be a number",
          })
          .positive({ message: " Amount must be positive" })
          .refine((value) => {
            // Split the number into its whole and fractional parts
            const [whole, fractional] = value.toString().split(".");
            // If there's no fractional part or its length is 2 or less, return true
            if (!fractional || fractional.length <= 2) return true;
            return {
              message:
                "Number should be non-negative and have no more than 2 decimal places.",
            };
          }),
        isCredit: z.boolean({ required_error: "Transaction type is required" }),
        desc: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const transaction = await ctx.prisma.transaction.create({
        data: {
          userId: authorId,
          ...input,
        },
      });

      return transaction;
    }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
