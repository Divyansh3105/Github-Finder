import './ErrorState.css';

export default function ErrorState({ message = 'User not found' }) {
  return (
    <div className="error-state animate-fade-in">
      <div className="error-icon-wrapper">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 15s1.5-2 4-2 4 2 4 2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      </div>
      <h2 className="error-title">Oops!</h2>
      <p className="error-message">{message}</p>
      <p className="error-help">Try searching for another GitHub username.</p>
    </div>
  );
}
