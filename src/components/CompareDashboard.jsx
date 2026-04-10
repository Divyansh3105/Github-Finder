import { useParams } from 'react-router-dom';
import { useGithubUser } from '../hooks/useGithubUser';
import SearchBar from './SearchBar';
import ProfileCard from './ProfileCard';
import StatsBar from './StatsBar';
import LanguageChart from './LanguageChart';
import Loader from './Loader';
import ErrorState from './ErrorState';
import './CompareDashboard.css';

function UserCompareColumn({ username }) {
  const { user, languages, loading, error } = useGithubUser(username);

  if (loading) {
    return (
      <div className="compare-column">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="compare-column">
        <ErrorState message={error} />
      </div>
    );
  }

  if (!user) return <div className="compare-column" />;

  return (
    <div className="compare-column animate-fade-in-up">
      <ProfileCard user={user} />
      <StatsBar user={user} />
      <div style={{ marginTop: '20px' }}>
        <LanguageChart languages={languages} />
      </div>
    </div>
  );
}

export default function CompareDashboard() {
  const { user1, user2 } = useParams();

  return (
    <>
      <SearchBar initialValue={`${user1} vs ${user2}`} />
      
      <div className="compare-header animate-fade-in">
        <h2 className="section-title">
          <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
          Compare Mode
        </h2>
        <p className="compare-subtitle">Side-by-side comparison of {user1} and {user2}</p>
      </div>

      <div className="compare-layout">
        <UserCompareColumn username={user1} />
        <div className="compare-divider">
          <span>VS</span>
        </div>
        <UserCompareColumn username={user2} />
      </div>
    </>
  );
}
