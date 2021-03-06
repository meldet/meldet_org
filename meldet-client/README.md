This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Make sure to create a `meldet-client/.env.local`. You can copy them from the .`env.template` files

2. run the development server:

```bash
yarn dev
```


3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. For getting the database up and running, see next heading.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## setting up database with Prisma
First of all, add your database connection information in `prisma/.env`. Run `cp prisma/.env prisma/.env.template` to create the file, then fill in the missing connection data. 
`npx prisma migrate dev --name init`. This will create the tables in your database, automatically create a migration file and run the seed script to populate your dev database with (mock) data. 
To run the seeding script manually, run `npx prisma db seed`. `npx prisma generate` will generate your Prisma client (npxand types) manually.

You can easily inspect your database with the prisma-studio tool. Just running `npx prisma studio` will open a browser window with everything you need. No need for a seperate database tool. 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
