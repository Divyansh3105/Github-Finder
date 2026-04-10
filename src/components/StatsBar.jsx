import { formatCount } from '../utils/helpers';
import './StatsBar.css';

const stats = [
  { key: 'followers', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', circle: { cx: 9, cy: 7, r: 4 }, path2: 'M23 21v-2a4 4 0 0 0-3-3.87', path3: 'M16 3.13a4 4 0 0 1 0 7.75', label: 'Followers' },
  { key: 'following', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', circle: { cx: 12, cy: 7, r: 4 }, label: 'Following' },
  { key: 'public_repos', label: 'Repositories' },
];

export default function StatsBar({ user }) {
  return (
    <div className="stats-bar animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {stats.map((stat) => (
        <div className="stat-card" key={stat.key}>
          <div className="stat-icon">
            {stat.key === 'public_repos' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="3" x2="6" y2="15"/>
                <circle cx="18" cy="6" r="3"/>
                <circle cx="6" cy="18" r="3"/>
                <path d="M18 9a9 9 0 0 1-9 9"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={stat.icon}/>
                <circle cx={stat.circle.cx} cy={stat.circle.cy} r={stat.circle.r}/>
              </svg>
            )}
          </div>
          <span className="stat-value">{formatCount(user[stat.key])}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
