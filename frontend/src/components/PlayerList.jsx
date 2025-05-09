import React from 'react';

function PlayerList({ players, onEdit, onDelete }) {
  return (
    <div>
      <h3>Players List</h3>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <strong>{player.name}</strong> - {player.position} ({player.team_name})
            <button onClick={() => onEdit(player)}>Edit</button>
            <button onClick={() => onDelete(player.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
