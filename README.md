# Buti

This is a Buti/打(ぶ)ち project bootstrapped with `create-t3-app`.

## How to contribute?

1. Fork this repository
2. Clone your fork
3. `npm install`
4. Set Google OAuth credentials in `.env.local`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
     - References: https://zenn.dev/hayato94087/articles/91179fbbe1cad4
   - `NEXTAUTH_SECRET`
     - `openssl rand -base64 32`
5. `npx prisma migrate deploy` or `npx prisma migrate reset`
6. `npm run dev` and access the `http://localhost:3000`

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Materials

- [T3 Stack](https://create.t3.gg/)
