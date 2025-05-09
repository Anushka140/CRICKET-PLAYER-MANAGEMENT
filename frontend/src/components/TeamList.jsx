import React from 'react';

function TeamList({ teams, onEdit, onDelete }) {
  return (
    <div>
      <h3>Teams List</h3>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <strong>{team.name}</strong> ({team.city}) - Coach: {team.coach}, Founded: {team.founded_year}
            <button onClick={() => onEdit(team)}>Edit</button>
            <button onClick={() => onDelete(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamList;
