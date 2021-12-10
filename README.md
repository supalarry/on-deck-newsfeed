# On Deck coding challenge: newsfeed

<img width="1280" alt="Screenshot 2021-12-10 at 22 35 07" src="https://user-images.githubusercontent.com/42170848/145644279-6ba095d9-1cfe-4f14-9332-630be700ddf5.png">

<img width="1280" alt="Screenshot 2021-12-10 at 22 35 18" src="https://user-images.githubusercontent.com/42170848/145644292-ab69668e-cda3-41af-a5a3-a06eef9d9cd7.png">


## Launch newsfeed

1. Clone it: `git clone https://github.com/supalarry/on-deck-newsfeed.git`
2. Open the folder: `cd on-deck-newsfeed`
3. Install the dependencies: `yarn install`
4. Run the dev server: `yarn dev`
5. Open http://localhost:3000

## What is this newsfeed about

This project portrays a simplified slice of On Deck community platform. 

We have users participating in three fellowships:
- Founders, modeled after the [On Deck Founders](https://www.beondeck.com/founders) program,
- [Angels](https://www.beondeck.com/angels),
- [Writers](https://www.beondeck.com/writers).

Newsfeed shows relevant posts for each fellowship. The posts are loaded lazily and are ordered by newest first.
The goal is to keep users up to date and to facilitate collaboration between them.

## Project structure

Tech stack:
- Next.js,
- TypeScript,
- Sqlite3,
- Apollo server,
- Apollo client,
- React.

Folder structure:
- `components/` — reusable React components;
- `features/` — newsfeed feature is stored here;
- `pages/` — the usual Next.js [page structure](https://nextjs.org/docs/basic-features/pages);
- `graphql/` — GraphQL server, schema, resolvers, DB connection;
- `scripts/` — contains the SQL script used for creating and populating the tables in `db.sqlite`.
- `shared/` — types and constants.
