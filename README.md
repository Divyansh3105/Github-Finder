# DevBoard — Premium GitHub Profile Explorer

![DevBoard Demo](./public/demo.webp)

DevBoard is a high-performance, premium GitHub profile dashboard built with React and Vite. It offers a stunning user interface to explore any GitHub developer's profile, aggregate their repositories, visualize language usage, and track contributions.

## Features ✨
- **Deep Analytics Dashboard:** View aggregated stats including followers, following, public forks, and total repos.
- **Language Charting:** A beautiful Doughnut chart visualizing the developer's most used languages using Chart.js.
- **Contribution Heatmap:** A detailed, color-coded heatmap tracking a user's GitHub activity over the past year.
- **Top Repositories Grid:** Interactively sort a developer's repositories by "Latest Updated" or "Top (Stars + Forks)".
- **Live Activity Feed:** See real-time events parsed directly from the GitHub Events API (pushes, pull requests, issues, stars, etc.).
- **Compare Mode (`/compare/user1/user2`):** Search for "user1 vs user2" to activate a pristine, side-by-side comparative dashboard mode.
- **Dark & Light Themes:** Toggle effortlessly between premium dark mode (default) and a clean, vibrant light mode.

## Built With 🛠️
- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Chart.js](https://www.chartjs.org/)
- [Vanilla CSS (Design Tokens)](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Installation & Running Locally 💻

1. Clone the repository and navigate into the folder:
   ```bash
   git clone https://github.com/Divyansh3105/Github-Finder.git
   cd Github-Finder
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Configure your GitHub Personal Access Token:
   - Create a `.env` file at the root.
   - Add your token to bypass rate limits:
     ```env
     VITE_GITHUB_TOKEN=your_github_personal_access_token_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Design System & Architecture 🎨
DevBoard uses a robust, scalable CSS foundation completely built without massive CSS frameworks. It takes advantage of extensive CSS Variables (`:root`) for instant theme swapping and modular stylesheet architecture per-component for high maintainability.

## License 📄
This project is open-source and available under the MIT License.
