import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getLanguageColor } from '../utils/helpers';
import './LanguageChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LanguageChart({ languages }) {
  const chartData = useMemo(() => {
    if (!languages || Object.keys(languages).length === 0) return null;

    // Sort by bytes descending, take top 8, group rest as "Other"
    const sorted = Object.entries(languages).sort(([, a], [, b]) => b - a);
    const top = sorted.slice(0, 8);
    const otherBytes = sorted.slice(8).reduce((sum, [, b]) => sum + b, 0);
    if (otherBytes > 0) top.push(['Other', otherBytes]);

    const totalBytes = top.reduce((sum, [, b]) => sum + b, 0);

    const labels = top.map(([lang]) => lang);
    const data = top.map(([, bytes]) => bytes);
    const percentages = top.map(([, bytes]) => totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(2) : "0.00");
    const colors = top.map(([lang]) => getLanguageColor(lang));

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderColor: 'var(--bg-card)',
          borderWidth: 2,
          hoverBorderColor: '#fff',
          hoverBorderWidth: 2,
        },
      ],
      percentages,
      totalBytes,
    };
  }, [languages]);

  if (!chartData) {
    return (
      <div className="language-chart-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="section-title">
          <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Languages
        </h3>
        <p className="no-data">No language data available</p>
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 15, 20, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(167, 139, 250, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: { family: 'Inter', weight: '600' },
        bodyFont: { family: 'Inter' },
        callbacks: {
          label: (ctx) => {
            const value = ctx.raw || ctx.dataset.data[ctx.dataIndex];
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const pct = total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";
            return ` ${ctx.label}: ${pct}%`;
          },
        },
      },
    },
  };

  return (
    <div className="language-chart-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <h3 className="section-title">
        <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        Languages
      </h3>
      <div className="chart-container">
        <div className="chart-wrapper">
          <Doughnut data={chartData} options={options} />
        </div>
        <div className="language-legend">
          {chartData.labels.map((lang, i) => (
            <div className="legend-item" key={lang}>
              <span
                className="legend-dot"
                style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}
              />
              <span className="legend-label">{lang}</span>
              <span className="legend-pct">{chartData.percentages[i]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
