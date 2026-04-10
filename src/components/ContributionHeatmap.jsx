import { useMemo, useState } from 'react';
import { HEATMAP_COLORS, MONTH_LABELS } from '../utils/helpers';
import './ContributionHeatmap.css';

export default function ContributionHeatmap({ contributions }) {
  const [tooltip, setTooltip] = useState(null);

  const { weeks, monthLabels, totalContributions } = useMemo(() => {
    if (!contributions || !contributions.contributions) {
      return { weeks: [], monthLabels: [], totalContributions: 0 };
    }

    let days = contributions.contributions;
    
    // Sort just in case it's not sorted
    days.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get the first day's day of week (0 = Sunday, 1 = Monday, ...)
    if (days.length > 0) {
      const firstDate = new Date(days[0].date);
      const startDayOfWeek = firstDate.getDay();
      
      // Pad empty days at the beginning so the first real day aligns with its day of week
      const padding = [];
      for (let i = 0; i < startDayOfWeek; i++) {
        padding.push({ date: null, count: 0, level: 0, empty: true });
      }
      days = [...padding, ...days];
    }

    // Group into weeks (7 days each)
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    // Generate month labels with column positions
    const monthLabels = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIdx) => {
      if (week.length > 0) {
        const firstRealDay = week.find((d) => !d.empty);
        if (firstRealDay) {
          const date = new Date(firstRealDay.date);
          const month = date.getMonth();
          if (month !== lastMonth) {
            monthLabels.push({ label: MONTH_LABELS[month], col: weekIdx });
            lastMonth = month;
          }
        }
      }
    });

    // Sum total
    const totalContributions = contributions.total
      ? Object.values(contributions.total).reduce((a, b) => a + b, 0)
      : days.filter(d => !d.empty).reduce((sum, d) => sum + d.count, 0);

    return { weeks, monthLabels, totalContributions };
  }, [contributions]);

  if (weeks.length === 0) {
    return (
      <div className="heatmap-section animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
        <h3 className="section-title">
          <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Contributions
        </h3>
        <p className="no-data">Contribution data unavailable</p>
      </div>
    );
  }

  return (
    <div className="heatmap-section animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
      <div className="heatmap-header">
        <h3 className="section-title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
          <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Contributions
        </h3>
        <span className="heatmap-total">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      <div className="heatmap-scroll">
        <div className="heatmap-grid-wrapper">
          {/* Month labels */}
          <div className="heatmap-months">
            <div className="heatmap-day-spacer" />
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className="month-label"
                style={{ gridColumn: m.col + 2 }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="heatmap-body">
            {/* Day labels */}
            <div className="heatmap-days">
              <span></span>
              <span>Mon</span>
              <span></span>
              <span>Wed</span>
              <span></span>
              <span>Fri</span>
              <span></span>
            </div>

            {/* Grid */}
            <div className="heatmap-grid" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
              {weeks.map((week, wi) =>
                week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className={`heatmap-cell ${day.empty ? 'is-empty' : ''}`}
                    style={{
                      backgroundColor: day.empty ? 'transparent' : (HEATMAP_COLORS[day.level] || HEATMAP_COLORS[0]),
                      gridColumn: wi + 1,
                      gridRow: di + 1,
                      opacity: day.empty ? 0 : 1,
                      pointerEvents: day.empty ? 'none' : 'auto'
                    }}
                    onMouseEnter={(e) => {
                      if (day.empty) return;
                      const rect = e.target.getBoundingClientRect();
                      setTooltip({
                        text: `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="heatmap-legend">
        <span>Less</span>
        {HEATMAP_COLORS.map((color, i) => (
          <div
            key={i}
            className="heatmap-cell legend-cell"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="heatmap-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
