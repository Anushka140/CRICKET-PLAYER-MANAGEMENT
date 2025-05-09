import React, { useEffect, useState } from 'react';
import api from '../api';
import MatchForm from '../components/MatchForm';

function Matches() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const fetchTeams = async () => {
    try {
      const res = await api.get('/teams/');
      setTeams(res.data);
    } catch {
      setError('Error loading teams');
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await api.get('/matches/');
      setMatches(res.data);
    } catch {
      setError('Error loading matches');
    }
  };

  const handleCreateMatch = async (matchData) => {
    try {
      await api.post('/matches/', matchData);
      fetchMatches();
    } catch {
      setError('Error saving match');
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchMatches();
  }, []);

  return (
    <div>
      <h2>Manage Matches</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MatchForm teams={teams} onSubmit={handleCreateMatch} />
      <h3>Match History</h3>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            {match.team_a_name} ({match.score_a}) vs {match.team_b_name} ({match.score_b})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Matches;
