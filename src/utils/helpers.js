/**
 * Format an ISO date string to a readable format.
 */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a number with K/M suffix for large numbers.
 */
export function formatCount(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
}

/**
 * GitHub-style language colors.
 * Subset of the most common languages.
 */
export const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Lua: '#000080',
  R: '#198CE7',
  Scala: '#c22d40',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Jupyter: '#DA5B0B',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  Perl: '#0298c3',
  Objective_C: '#438eff',
  Vim: '#199f4b',
};

/**
 * Get color for a language, with fallback.
 */
export function getLanguageColor(lang) {
  return LANGUAGE_COLORS[lang] || '#8b8b8b';
}

/**
 * Contribution heatmap intensity colors (0-4).
 */
export const HEATMAP_COLORS = [
  'rgba(255, 255, 255, 0.04)',  // level 0 — empty
  '#5b3a8c',                      // level 1 — low
  '#7c4dbd',                      // level 2 — medium
  '#9f6ae0',                      // level 3 — high
  '#c084fc',                      // level 4 — max
];

/**
 * Month labels.
 */
export const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
