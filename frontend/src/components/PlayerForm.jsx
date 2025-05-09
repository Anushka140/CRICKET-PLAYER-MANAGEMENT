import React, { useState, useEffect } from 'react';

function PlayerForm({ teams, onSubmit, selectedPlayer, clearSelection }) {
  const [formData, setFormData] = useState({
    name: '',
    team_id: '',
    position: '',
  });

  useEffect(() => {
    if (selectedPlayer) {
      setFormData(selectedPlayer);
    }
  }, [selectedPlayer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.team_id.trim()) {
      alert('Name and Team are required');
      return;
    }
    onSubmit(formData);
    setFormData({ name: '', team_id: '', position: '' });
    if (clearSelection) clearSelection();
  };

  return (
    <form onSubmit={handleSubmit} className="player-form">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Player Name" required />
      <select name="team_id" value={formData.team_id} onChange={handleChange} required>
        <option value="">Select Team</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
      <button type="submit">{selectedPlayer ? 'Update Player' : 'Add Player'}</button>
    </form>
  );
}

export default PlayerForm;
