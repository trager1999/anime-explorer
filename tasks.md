# Anime Explorer ׳’ג‚¬ג€ Development Tasks

## Task 1 [X] Project Setup and Local Anime Data
- Initialize the React + Vite + TypeScript project.
- Create TypeScript interfaces for anime data.
- Create a local JSON file containing sample anime entries.
- Build the initial Explore page using the local data.
- Create reusable anime card components in separate files.

**Done when:**
- The project runs with `npm run dev`.
- The Explore page displays anime from local JSON data.
- Anime cards show a poster, title, and rating.
- TypeScript types are used without `any`.
- Create at least four reusable custom components, each in a separate file.

## Task 2 [X] ׳’ג‚¬ג€ Navigation and Routing
- Install and configure React Router.
- Create routes for Explore, Anime Details, Favorites, and Statistics.
- Implement the dynamic route `/anime/:id`.
- Add a shared navigation menu.
- Make anime cards navigate to their details pages.

**Done when:**
- All four pages can be accessed through navigation.
- Selecting an anime opens the correct details URL.
- The details page retrieves the selected anime ID using `useParams`.
- At least four custom components exist in separate files.
- `npm run build` completes without errors.

## Task 3 [X] - Tenrai API Integration
- Replace the local anime list with data from the Tenrai API (Jikan-compatible response structure).
- Fetch data using `useEffect`.
- Create TypeScript types for the API response.
- Handle loading, error, and successful data states.

**Done when:**
- Anime data is retrieved from the Tenrai API using a Jikan-compatible response structure.
- Loading and error messages are displayed appropriately.
- The Explore page displays the retrieved anime.

## Task 4 [X] ׳’ג‚¬ג€ Vitest Setup and Initial Tests
- Install and configure Vitest.
- Install `@vitest/ui`.
- Add `test` and `test:ui` scripts to `package.json`.
- Create at least five meaningful unit tests for project logic.

**Done when:**
- `npm test` runs successfully.
- At least five tests pass.
- `npm run test:ui` opens the Vitest UI.

## Task 5 [X] ׳’ג‚¬ג€ Anime Details Page
- Display the selected anime's detailed information.
- Include synopsis, score, episodes, release year, status, genres, and studios.
- Add a button for managing favorites.

**Done when:**
- The details page displays the correct anime information.
- Missing API information is handled gracefully.
- The favorite button responds to user interaction.

## Task 6 [X] ׳’ג‚¬ג€ Favorites Functionality
- Implement adding and removing anime from favorites.
- Save favorites in LocalStorage.
- Load saved favorites when the application starts.
- Create shared favorite state for the relevant pages.

**Done when:**
- Users can add and remove anime from favorites.
- Favorites remain saved after refreshing the browser.
- The Favorites page displays saved anime.

## Task 7 [X] ׳’ג‚¬ג€ Explore Search and Genre Filtering
- Implement search by anime title.
- Implement filtering by genre.
- Allow search and filtering to work together.
- Display a message when no anime match the selected criteria.

**Done when:**
- Search returns matching anime.
- Genre filtering works correctly.
- Search and filtering can be used simultaneously.

## Task 8 [X] ׳’ג‚¬ג€ Favorites Page
- Complete the Favorites page layout.
- Display saved anime using reusable anime cards.
- Add navigation to anime details.
- Support removing favorites directly from the page.
- Add an empty state when no favorites exist.

**Done when:**
- All saved anime are displayed correctly.
- Users can open details or remove favorites.
- The empty state appears when the list is empty.

## Task 9 [X] ׳’ג‚¬ג€ Statistics Page
- Calculate the total number of available anime.
- Calculate the average anime rating.
- Identify the most common genres.
- Calculate anime distribution by status.
- Display the results in a clear visual layout.

**Done when:**
- Statistics are calculated from available anime data.
- All required statistics are displayed.
- Empty or incomplete data does not break the page.

## Task 10 [X] ׳’ג‚¬ג€ Cinematic UI and Responsive Design
- Apply the Dark Cinematic visual style.
- Use dark backgrounds with purple and blue accents.
- Improve typography, anime cards, spacing, and hover effects.
- Add consistent styling across all pages.
- Optimize layouts for desktop and mobile screens.

**Done when:**
- All pages follow a consistent cinematic design.
- The application is usable on narrow screens.
- Navigation and content remain readable on mobile.

## Task 11 [X] ׳’ג‚¬ג€ Testing and Final Quality Checks
- Add and run automated tests for API service and favorites; manually verify search, filtering, and statistics.
- Fix identified bugs.
- Check loading, error, empty, and success states.
- Verify navigation and dynamic routes.
- Check TypeScript errors and browser console issues.

**Done when:**
- At least five meaningful Vitest tests pass.
- All four pages work correctly.
- No critical TypeScript or runtime errors remain.

## Task 12 [X]׳’ג‚¬ג€ Documentation and Final Submission
- Write the project README.
- Document the application features and technologies.
- Include installation, development, and testing instructions.
- Document the Tenrai API and its Jikan-compatible response structure.
- Review `PRD.md`, `tasks.md`, and `PROMPTS.md`.
- Run the production build.
- Prepare the public GitHub repository for submission.

**Done when:**
- `npm run build` completes successfully.
- `npm test` passes.
- README contains all required documentation.
- All required project documents are committed.
- The public GitHub repository is ready for submission.

