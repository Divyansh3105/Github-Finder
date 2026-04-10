import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar({ initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      if (trimmed.includes(' vs ')) {
        const parts = trimmed.split(' vs ').map(t => t.trim());
        if (parts.length === 2 && parts[0] && parts[1]) {
          navigate(`/compare/${parts[0]}/${parts[1]}`);
          return;
        }
      }
      navigate(`/${trimmed}`);
    }
  };

  return (
    <form className="search-bar glass" onSubmit={handleSubmit}>
      <div className="search-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>
      <input
        ref={inputRef}
        id="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a username (e.g. user1 vs user2)..."
        autoComplete="off"
        spellCheck="false"
      />
      <button type="submit" id="search-btn">
        Search
      </button>
    </form>
  );
}
