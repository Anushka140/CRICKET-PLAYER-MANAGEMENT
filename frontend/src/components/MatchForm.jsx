import React, { useState, useEffect } from 'react';

function MatchForm({ teams, onSubmit }) {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [scoreA, setScoreA] = useState('');
  const [scoreB, setScoreB] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamA || !teamB || teamA === teamB) {
      alert('Please select two different teams.');
      return;
    }
    onSubmit({ team_a_id: teamA, team_b_id: teamB, score_a: scoreA, score_b: scoreB });
    setTeamA('');
    setTeamB('');
    setScoreA('');
    setScoreB('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Match</h3>
      <select value={teamA} onChange={(e) => setTeamA(e.target.value)}>
        <option value="">Select Team A</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>

      <select value={teamB} onChange={(e) => setTeamB(e.target.value)}>
        <option value="">Select Team B</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>

      <input type="number" placeholder="Score A" value={scoreA} onChange={(e) => setScoreA(e.target.value)} />
      <input type="number" placeholder="Score B" value={scoreB} onChange={(e) => setScoreB(e.target.value)} />
      <button type="submit">Create Match</button>
    </form>
  );
}

export default MatchForm;
