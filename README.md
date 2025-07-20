# Freelance Boost AI

Freelance Boost AI is a modern web application built with Next.js, designed to help users interact with and manage AI-powered companions. The platform features user authentication, a searchable companion library, user profiles, and subscription management.

## Features

- **Companion Library**: Browse, search, and filter a collection of AI companions by name, topic, or subject. Add new companions as needed.
- **User Authentication**: Secure sign-up and sign-in powered by Clerk.
- **User Profile**: View your profile information and completed lessons.
- **Subscription Management**: (Feature present; expand as needed for premium features.)
- **Modern UI**: Built with reusable React components and styled using Tailwind CSS.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Authentication**: [Clerk](https://clerk.com/)
- **Component Libraries**: Radix UI, Lucide React, Lottie React

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd freelance-boost-ai
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in the required values (e.g., `DATABASE_URL` for PostgreSQL, Clerk keys).
4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
6. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

- `app/` - Main application pages and routes
- `components/` - Reusable UI components
- `prisma/` - Prisma schema and database migrations
- `constants/`, `lib/`, `actions/` - Utilities, constants, and server actions

## Scripts

- `dev` - Start the development server
- `build` - Build the application for production
- `start` - Start the production server
- `lint` - Run ESLint

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute or open issues to help improve the project!
