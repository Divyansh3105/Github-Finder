const GITHUB_API = 'https://api.github.com';
const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';

const getHeaders = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  return token ? { Authorization: `token ${token}` } : {};
};

/**
 * Fetch a GitHub user profile.
 */
export async function fetchUser(username) {
  const res = await fetch(`${GITHUB_API}/users/${username}`, { headers: getHeaders() });
  if (!res.ok) {
    if (res.status === 403 || res.status === 429) {
      throw new Error('API Rate Limit Exceeded. Please try again later.');
    }
    throw new Error('User not found');
  }
  return res.json();
}

/**
 * Fetch a user's repositories (up to 30, sorted by most recently updated).
 */
export async function fetchRepos(username) {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=30&sort=updated`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error('Failed to fetch repositories');
  return res.json();
}

/**
 * Aggregate language byte-counts across all repos.
 * Fetches the /languages endpoint for each repo and sums totals.
 * Returns an object like { JavaScript: 150000, Python: 80000, ... }
 */
export async function fetchLanguages(username, repos) {
  const languageTotals = {};

  const results = await Promise.allSettled(
    repos.map(async (repo) => {
      if (!repo.languages_url) return {};
      const res = await fetch(repo.languages_url, { headers: getHeaders() });
      if (!res.ok) return {};
      return res.json();
    })
  );

  results.forEach((result) => {
    if (result.status === 'fulfilled' && result.value) {
      Object.entries(result.value).forEach(([lang, bytes]) => {
        languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
      });
    }
  });

  return languageTotals;
}

/**
 * Fetch contribution heatmap data from the community API.
 */
export async function fetchContributions(username) {
  const res = await fetch(`${CONTRIBUTIONS_API}/${username}?y=last`);
  if (!res.ok) throw new Error('Failed to fetch contributions');
  return res.json();
}

/**
 * Fetch recent events for a user (pushes, PRs, etc.)
 */
export async function fetchEvents(username) {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/events/public?per_page=15`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}
