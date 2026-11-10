# Anime Explorer – Product Requirements Document

## 1. Project Overview

Anime Explorer is a modern anime discovery application that allows users to explore anime titles, view detailed information, save favorites, and discover interesting statistics.

The application will use a dark cinematic design inspired by modern anime streaming and discovery platforms.

## 2. Target Audience

Anime fans who want a simple and visually appealing platform to discover anime, explore information about different titles, and keep track of their favorite series.

## 3. Technology Stack

- React
- Vite
- TypeScript
- React Router
- CSS
- Jikan API (MyAnimeList public API)
- Vitest
- LocalStorage for saving favorites

The application will be front-end only, without a backend or database.

## 4. Application Pages

### 4.1 Explore Page (/)

The main discovery page.

Features:
- Display a list of popular anime.
- Show anime posters, titles, ratings, and release information.
- Search anime by title.
- Filter anime by genre.
- Click an anime card to open its details page.

### 4.2 Anime Details Page (/anime/:id)

Displays detailed information about a selected anime.

Features:
- Anime poster and title.
- Synopsis.
- User score.
- Number of episodes.
- Release year and status.
- Genres.
- Studios.
- Option to add or remove the anime from favorites.

### 4.3 Favorites Page (/favorites)

Displays anime titles saved by the user.

Features:
- Display all saved anime.
- Open an anime details page.
- Remove anime from favorites.
- Persist favorites using LocalStorage.

### 4.4 Statistics Page (/statistics)

Displays interesting statistics about the anime collection.

Features:
- Total number of anime displayed.
- Average anime rating.
- Most common genres.
- Distribution of anime by status.

Statistics will be calculated from the anime data available to the application.

## 5. API Integration

The application will use the public Jikan API.

Main endpoint:

https://api.jikan.moe/v4/top/anime

The API provides anime information without requiring an API key.

Data will be retrieved using fetch inside React useEffect.

The application must handle:
- Loading state.
- Error state.
- Successful data retrieval.

## 6. Design Requirements

Design style: Dark Cinematic.

Visual direction:
- Dark background.
- Purple and blue accent colors.
- Large anime posters.
- Modern cards with subtle hover effects.
- Clear typography.
- Consistent navigation.
- Responsive layout for desktop and mobile.

Application language: English.

## 7. Functional Requirements

- React Router navigation between all pages.
- Dynamic anime detail routes using anime IDs.
- TypeScript types for API data and component props.
- Reusable components.
- Search and genre filtering.
- Favorites saved in LocalStorage.
- At least five meaningful unit tests using Vitest.
- Loading, error, and success states.

## 8. User Stories

- When I open the application, I see a collection of popular anime.
- When I search for an anime, I see matching results.
- When I select an anime, I see its detailed information.
- When I save an anime to favorites, I can find it on my Favorites page.
- When I visit Statistics, I see useful information about the available anime collection.

## 9. Project Scope

Included:
- Four application pages.
- Public API integration.
- Search and filtering.
- Favorites functionality.
- Statistics.
- Responsive CSS.
- Unit testing.

Not included:
- User registration or login.
- Backend server.
- External database.
- Paid API services.

## 10. Definition of Done

The project is considered complete when:
- All four pages work correctly.
- Navigation and dynamic routes work.
- Anime information is retrieved from the Jikan API.
- Search and filtering work.
- Favorites persist after refreshing the page.
- At least five Vitest tests pass.
- The application builds without errors.
- The interface works on desktop and mobile.
- The GitHub repository contains the required documentation.