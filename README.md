# Anime Explorer

A cinematic anime discovery application built with React, TypeScript, and Vite.

## Features

- Explore popular anime titles.
- Search anime by title.
- Filter anime by genre.
- View detailed anime information.
- Save and remove favorite anime.
- Keep favorites saved using LocalStorage.
- View anime collection statistics.
- Responsive dark cinematic design.

## Technology

- React 19
- TypeScript
- Vite
- React Router
- CSS
- Tenrai API (Jikan-compatible data)
- Vitest
- React Testing Library
- LocalStorage

## API

The application uses the Tenrai API.

Base URL: https://api.tenrai.org/v1

Endpoints:
- Top anime: /top/anime?limit=25&sfw
- Anime details: /anime/{id}

No API key is configured.

## Installation

Requirements: Node.js and npm.

Clone the repository:

git clone https://github.com/trager1999/anime-explorer.git

Enter the project folder:

cd anime-explorer

Install dependencies:

npm install

Start the application:

npm run dev

## Available Commands

- npm run dev — Start the development server.
- npm run build — Check TypeScript and create a production build.
- npm run lint — Run ESLint.
- npm test — Run automated tests.
- npm run preview — Preview the production build.

## Testing

The project uses Vitest and React Testing Library.

Automated tests cover API service behavior and favorites functionality.

## Project Structure

- src/components — Reusable UI components.
- src/context — Favorites state and provider.
- src/pages — Explore, Details, Favorites, and Statistics pages.
- src/services — API service and tests.
- src/types.ts — TypeScript data types.
- src/App.tsx — Application routes and layout.
- src/main.tsx — Application entry point.

## Storage

Favorite anime are saved locally in the browser using LocalStorage.

## Project Status

The application includes four main pages, API integration, search and filtering, persistent favorites, statistics, responsive styling, automated tests, and production build support.
