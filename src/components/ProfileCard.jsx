import { formatDate } from '../utils/helpers';
import './ProfileCard.css';

export default function ProfileCard({ user }) {
  return (
    <div className="profile-card animate-fade-in-up">
      <div className="profile-header">
        <div className="avatar-wrapper">
          <img src={user.avatar_url} alt={`${user.login} avatar`} className="avatar" />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user.name || user.login}</h1>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-username"
          >
            @{user.login}
          </a>
          <p className="profile-bio">{user.bio || 'No bio available'}</p>
          <div className="profile-meta">
            {user.location && (
              <span className="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {user.location}
              </span>
            )}
            <span className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Joined {formatDate(user.created_at)}
            </span>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="view-profile-btn"
          >
            View Profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
