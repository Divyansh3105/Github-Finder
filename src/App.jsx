import { useParams, Outlet } from "react-router-dom";
import { useGithubUser } from "./hooks/useGithubUser";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import StatsBar from "./components/StatsBar";
import AdditionalInfo from "./components/AdditionalInfo";
import LanguageChart from "./components/LanguageChart";
import ContributionHeatmap from "./components/ContributionHeatmap";
import RepoGrid from "./components/RepoGrid";
import ActivityFeed from "./components/ActivityFeed";
import ThemeToggle from "./components/ThemeToggle";
import Loader from "./components/Loader";
import ErrorState from "./components/ErrorState";
import "./App.css";

function Dashboard() {
  const { username } = useParams();
  const { user, repos, languages, contributions, events, loading, error } =
    useGithubUser(username);

  return (
    <>
      <SearchBar initialValue={username || ""} />

      {loading && <Loader />}

      {error && !loading && <ErrorState message={error} />}

      {user && !loading && !error && (
        <div className="dashboard">
          <ProfileCard user={user} />
          <StatsBar user={user} />
          <AdditionalInfo user={user} />
          <div className="dashboard-grid">
            <LanguageChart languages={languages} />
            <ContributionHeatmap contributions={contributions} />
          </div>
          <div className="dashboard-grid">
            <RepoGrid repos={repos} />
            <ActivityFeed events={events} />
          </div>
        </div>
      )}
    </>
  );
}

function Home() {
  return (
    <>
      <SearchBar />
      <div className="hero animate-fade-in-up">
        <div className="hero-icon">
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        </div>
        <h2 className="hero-title">Explore any GitHub profile</h2>
        <p className="hero-subtitle">
          Search for a username to view their dashboard with language breakdown,
          contribution heatmap, and repositories.
        </p>
        <div className="hero-examples">
          <span>Try:</span>
          <a href="/torvalds">torvalds</a>
          <a href="/Divyansh3105">Divyansh3105</a>
          <a href="/gaearon">gaearon</a>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <a href="/" className="logo">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span>DevBoard</span>
        </a>
        <ThemeToggle />
      </header>

      <main className="container app-main">
        <Outlet />
      </main>
    </div>
  );
}

// Export page components for routing
export { Home, Dashboard };
