import { useState, useEffect, useCallback } from 'react';
import { fetchUser, fetchRepos, fetchLanguages, fetchContributions, fetchEvents } from '../api/github';

/**
 * Custom hook to fetch all GitHub data for a username.
 * Returns { user, repos, languages, contributions, loading, error, refetch }
 */
export function useGithubUser(username) {
  const [state, setState] = useState({
    user: null,
    repos: [],
    languages: null,
    contributions: null,
    events: [],
    loading: false,
    error: null,
  });

  const loadUser = useCallback(async (name) => {
    if (!name) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch user first — if this fails, don't bother with the rest
      const user = await fetchUser(name);

      // Fetch repos, contributions in parallel
      const [reposResult, contribResult, eventsResult] = await Promise.allSettled([
        fetchRepos(name),
        fetchContributions(name),
        fetchEvents(name),
      ]);

      const repos =
        reposResult.status === 'fulfilled' ? reposResult.value : [];
      const contributions =
        contribResult.status === 'fulfilled' ? contribResult.value : null;
      const events =
        eventsResult.status === 'fulfilled' ? eventsResult.value : [];

      // Fetch languages from repos (if we have any)
      let languages = null;
      if (repos.length > 0) {
        try {
          languages = await fetchLanguages(name, repos);
        } catch {
          languages = null;
        }
      }

      setState({
        user,
        repos,
        languages,
        contributions,
        events,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        user: null,
        repos: [],
        languages: null,
        contributions: null,
        events: [],
        loading: false,
        error: err.message || 'Something went wrong',
      });
    }
  }, []);

  useEffect(() => {
    loadUser(username);
  }, [username, loadUser]);

  return {
    ...state,
    refetch: () => loadUser(username),
  };
}
