# Freelance Boost AI

AI Learning Agent is a Next.js web app that lets users discover and interact with AI-powered learning companions. Users can browse a library of companions, view details, start guided sessions, track progress, and manage personal bookmarks and history — all within a clean, modern interface.

## Features

- **Companion Library**: Browse, search, and filter AI companions by name, topic, or subject.
- **Create & Manage Companions**: Add new companions with custom subjects and prompts.
- **Guided Sessions**: Chat with companions through an integrated agent interface.
- **Bookmarks**: Save and manage favorite sessions for quick access.
- **Progress Tracking**: View completed lessons and companion interaction history.
- **User Accounts**: Secure authentication with Clerk for sign-in and profile pages.
- **Modern UI**: Built with reusable React components and Tailwind CSS.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Prisma](https://www.prisma.io/)
- **Auth**: [Clerk](https://clerk.com/)
- **UI/UX**: Radix UI, Lucide React, Lottie React

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
   Create a `.env.local` file with values such as:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - Any webhook secrets you use for Clerk
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
6. **Open** http://localhost:3000 **in your browser.**

## Project Structure

- `app/` – Application routes and pages (App Router)
- `components/` – Reusable UI components
- `actions/` – Server actions for data fetching and mutations
- `lib/` – Utilities and client/server helpers
- `constants/` – App-wide constants
- `prisma/` – Prisma schema and database migrations

## Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint

## Contributing

Contributions are welcome! Please open an issue or pull request with improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
