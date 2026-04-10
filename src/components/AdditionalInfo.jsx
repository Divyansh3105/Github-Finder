import './AdditionalInfo.css';

export default function AdditionalInfo({ user }) {
  const items = [
    {
      show: !!user.company,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      ),
      label: user.company,
    },
    {
      show: !!user.blog,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      ),
      label: user.blog,
      href: user.blog?.startsWith('http') ? user.blog : `https://${user.blog}`,
    },
    {
      show: !!user.twitter_username,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      ),
      label: `@${user.twitter_username}`,
      href: `https://x.com/${user.twitter_username}`,
    },
  ];

  const visibleItems = items.filter((item) => item.show);
  if (visibleItems.length === 0) return null;

  return (
    <div className="additional-info animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
      {visibleItems.map((item, i) => (
        <div className="info-chip" key={i}>
          <span className="info-chip-icon">{item.icon}</span>
          {item.href ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
