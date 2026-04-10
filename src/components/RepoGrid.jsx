import { useState, useMemo } from 'react';
import { formatDate, getLanguageColor } from '../utils/helpers';
import './RepoGrid.css';

export default function RepoGrid({ repos }) {
  const [sortType, setSortType] = useState('latest');

  // Show at most 8 repos
  const display = useMemo(() => {
    let sorted = [...repos];
    if (sortType === 'top') {
      sorted.sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count));
    } else {
      sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
    return sorted.slice(0, 8);
  }, [repos, sortType]);

  if (repos.length === 0) {
    return (
      <div className="repos-section animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="section-title-wrapper">
          <h3 className="section-title">
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            Repositories
          </h3>
        </div>
        <p className="no-repos">No public repositories found</p>
      </div>
    );
  }

  return (
    <div className="repos-section animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="section-title-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <h3 className="section-title" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
          <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          Repositories
        </h3>
        <div className="repo-sort-toggle" style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`sort-btn ${sortType === 'latest' ? 'active' : ''}`}
            onClick={() => setSortType('latest')}
          >
            Latest
          </button>
          <button 
            className={`sort-btn ${sortType === 'top' ? 'active' : ''}`}
            onClick={() => setSortType('top')}
          >
            Top
          </button>
        </div>
      </div>
      <div className="repo-grid stagger">
        {display.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card"
          >
            <div className="repo-card-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="repo-icon"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              <span className="repo-name">{repo.name}</span>
            </div>
            <p className="repo-desc">
              {repo.description || 'No description available'}
            </p>
            <div className="repo-meta">
              {repo.language && (
                <span className="repo-meta-item">
                  <span
                    className="lang-dot"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  {repo.language}
                </span>
              )}
              <span className="repo-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                {repo.stargazers_count}
              </span>
              <span className="repo-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
                {repo.forks_count}
              </span>
              <span className="repo-meta-item updated">
                {formatDate(repo.updated_at)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
