# BlockQuest Backend

BlockQuest is a project I am building to help beginners learn about cryptocurrency in small steps. This repository is the backend part of the project. I am still learning, so I plan to build it up over time.

## Why I chose this project

Crypto has a lot of new words and ideas that can feel confusing at first. I want BlockQuest to explain the basics with short lessons and quizzes, so beginners can learn a little at a time.

## What works so far

- View the lesson list and open a lesson.
- Read the lesson and its quiz questions.
- Submit quiz answers and see the score and explanations.
- Save lesson completion for a logged-in user.
- View saved lesson progress after logging in.

Right now, the project has one starter lesson. A lesson is marked complete when all of its quiz questions are answered correctly.

## What I used

- Node.js and Express for the server.
- PostgreSQL to save users, lessons, quiz questions, and progress.

## Run it on your computer

1. Install the packages:

   ```sh
   npm install
   ```

2. Create a PostgreSQL database named `blockquest_rebuild`.

3. Copy `example.env` and name the copy `.env`. Put your local database password in `DATABASE_URL` and choose a private value for `JWT_SECRET`. Keep `.env` on your computer; it should not be uploaded.

4. Create the tables and add the starter lesson:

   ```sh
   npm run db:reset
   ```

   This resets the local tables and starter data.

5. Start the server:

   ```sh
   npm run dev
   ```

The server uses port 3000 by default.

## Main routes

- `POST /users/register` creates an account and returns a login token.
- `POST /users/login` signs in and returns a token.
- `GET /lessons` shows the lesson list.
- `GET /lessons/:id` shows one lesson and its quiz choices.
- `POST /lessons/:id/quiz` checks answers and saves progress. A login token is required.
- `GET /lessons/progress` shows the logged-in user's progress. A login token is required.

For routes that need a login, send the token in the `Authorization` header as `Bearer <token>`.

## Folders

- `api/` has the server routes.
- `db/schema.sql` describes the database tables.
- `db/queries/` has the code that talks to PostgreSQL.
- `db/seed.js` adds the starter lesson and quiz.
- `middleware/` and `utils/` have shared server code.

## Screenshots

This repository is only the backend, so it does not have page screenshots yet. I will add screenshots when the frontend is ready.
