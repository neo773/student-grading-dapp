import { z } from "zod"
import { procedure, router } from "../trpc"
import { TRPCError } from "@trpc/server"
import { createTransport } from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport"
import { validate } from "email-validator"

export const appRouter = router({
  signup: procedure
    .input(
      z.object({
        walletAddress: z.string(),
        emailAddress: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const isValid = validate(input.emailAddress)

        if (!isValid) {
          return {
            status: "failed",
            error: "Invalid email",
          } as const
        }

        const transporter = createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        } as MailOptions)

        await transporter.sendMail({
          from: "<mailer@result-dapp.com>",
          to: "admin@result-dapp.com",
          subject: "New Admin Registration Request",
          text: `New Admin Registration Request for 
          wallet address: ${input.walletAddress}
          email: ${input.emailAddress}
          `,
        })

        return {
          status: "success",
          message: "Added to approval list",
        } as const
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
        })
      }
    }),
})

export type AppRouter = typeof appRouter
