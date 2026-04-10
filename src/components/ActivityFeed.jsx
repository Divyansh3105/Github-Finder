import { formatDate } from '../utils/helpers';
import './ActivityFeed.css';

function getEventIcon(type) {
  switch (type) {
    case 'PushEvent':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
    case 'PullRequestEvent':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 18V6a2 2 0 0 1 2-2h1m6 14v-6a2 2 0 0 1 2-2h1m-5-4h4M6 21h2m10 0h2m-6-1h4M7 3v2m10-2v2M6 8V6m0 12v2"/></svg>;
    case 'IssuesEvent':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
    case 'CreateEvent':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case 'WatchEvent':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case 'ForkEvent':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></svg>;
    default:
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
  }
}

function getEventDescription(event) {
  const repoName = event.repo.name;
  switch (event.type) {
    case 'PushEvent':
      return `Pushed to ${event.payload.ref?.replace('refs/heads/', '') || 'repository'} in ${repoName}`;
    case 'PullRequestEvent':
      return `${event.payload.action === 'opened' ? 'Opened' : 'Created'} PR in ${repoName}`;
    case 'IssuesEvent':
      return `${event.payload.action === 'opened' ? 'Opened' : 'Created'} issue in ${repoName}`;
    case 'CreateEvent':
      return `Created ${event.payload.ref_type} in ${repoName}`;
    case 'WatchEvent':
      return `Starred ${repoName}`;
    case 'ForkEvent':
      return `Forked ${repoName}`;
    default:
      return `Activity in ${repoName}`;
  }
}

export default function ActivityFeed({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="activity-section animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <h3 className="section-title">
          <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Recent Activity
        </h3>
        <p className="no-activity">No recent activity found</p>
      </div>
    );
  }

  const display = events.slice(0, 10);

  return (
    <div className="activity-section animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <h3 className="section-title">
        <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Recent Activity
      </h3>
      <div className="activity-feed stagger">
        {display.map((event) => (
          <div key={event.id} className="activity-item">
            <div className="activity-icon">
              {getEventIcon(event.type)}
            </div>
            <div className="activity-content">
              <p className="activity-desc">
                {getEventDescription(event)}
              </p>
              <span className="activity-date">
                {formatDate(event.created_at)}
              </span>
            </div>
            {event.payload.commits && event.payload.commits.length > 0 && (
              <div className="activity-commits">
                {event.payload.commits.slice(0, 2).map((commit) => (
                  <div key={commit.sha} className="commit-item">
                    <span className="commit-sha">{commit.sha.substring(0, 7)}</span>
                    <span className="commit-msg">{commit.message.split('\n')[0]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
