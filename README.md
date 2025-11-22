# Stream Chat

This is a real-time chat application built with [Next.js](https://nextjs.org), styled with [Tailwind CSS](https://tailwindcss.com), and powered by [Google Generative AI](https://cloud.google.com/generative-ai).

## Live Demo

Experience the live chat application here: [https://stream-chat-8do062g3s-razin-shafayets-projects.vercel.app/](https://stream-chat-8do062g3s-razin-shafayets-projects.vercel.app/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## API Routes

This project includes two API routes for interacting with the Google Generative AI:

-   **`/api/chat`**: Handles standard chat requests, sending a message and receiving a single response.
    This endpoint can be edited in `pages/api/chat.ts`.

-   **`/api/chat-stream`**: Handles streaming chat requests, receiving responses in real-time as they are generated.
    This endpoint can be edited in `pages/api/chat-stream.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

## Technologies Used

-   [Next.js](https://nextjs.org/) - React framework for production
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
-   [Google Generative AI](https://cloud.google.com/generative-ai) - For powering the chat responses
-   React - For building the user interface

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

