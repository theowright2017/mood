## Next specific

# Router

- catch all route
    - folder - /sign-up/[[...folder-name]]
    - all calls to url sign-up will direct to whatever file is in final folder

- add page to route
    - a route folder needs a Page.tsx at it's route to render something



## Clerk Auth

# Initial setup

- components and .env setup available from Clerk website for Next.js


## Prisma

# Commands

- Any changes to schema need to be pushed to db
    - migrate (see docs)


## Ideas for AI

# Vectors

- Vectors are essentially a numerical version of a given value
- They are then stored in a vector database, and plotted close to similar values.
    - As this plots over multiple 'dimensions', similarities can exist between sentiment, allusion, etc.  Non-typical categories
    - This makes searching for similar values much quicker and less 'token intensive'
- Use case
    - Scrape the docs for React, collect every page / link within the site
    - Use the embeddings (collection of vectors) to build something in React based on the docs
    