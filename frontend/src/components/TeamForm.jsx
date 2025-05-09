/*
import React, { useState, useEffect } from 'react';

function TeamForm({ onSubmit, selectedTeam, clearSelection }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    coach: '',
    founded_year: '',
  });

  useEffect(() => {
    if (selectedTeam) {
      setFormData(selectedTeam);
    }
  }, [selectedTeam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Team name is required');
      return;
    }
    onSubmit(formData);
    setFormData({ name: '', city: '', coach: '', founded_year: '' });
    if (clearSelection) clearSelection();
  };

  return (
    <form onSubmit={handleSubmit} className="team-form">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Team Name" required />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <input name="coach" value={formData.coach} onChange={handleChange} placeholder="Coach" />
      <input name="founded_year" type="number" value={formData.founded_year} onChange={handleChange} placeholder="Founded Year" />
      <button type="submit">{selectedTeam ? 'Update Team' : 'Add Team'}</button>
    </form>
  );
}

export default TeamForm;
*/

import React, { useState, useEffect } from 'react';

function TeamForm({ onSubmit, selectedTeam, clearSelection }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    coach: '',
    founded_year: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedTeam) {
      setFormData({
        name: selectedTeam.team_name || '',
        city: selectedTeam.city || '',
        coach: selectedTeam.coach || '',
        founded_year: selectedTeam.founded_year || '',
      });
    }
  }, [selectedTeam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.name.trim() || !formData.city.trim() || !formData.coach.trim() || !formData.founded_year) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    try {
      // Convert 'name' to 'team_name' for backend
      const teamData = {
        team_name: formData.name,
        city: formData.city,
        coach: formData.coach,
        founded_year: formData.founded_year,
      };

      await onSubmit(teamData);

      // Reset form
      setFormData({ name: '', city: '', coach: '', founded_year: '' });
      if (clearSelection) clearSelection();
    } catch (err) {
      console.error('Error submitting team:', err);
      setError('Failed to save team. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="team-form">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Team Name" required />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
      <input name="coach" value={formData.coach} onChange={handleChange} placeholder="Coach" required />
      <input name="founded_year" type="number" value={formData.founded_year} onChange={handleChange} placeholder="Founded Year" required />
      {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
      <button type="submit">{selectedTeam ? 'Update Team' : 'Add Team'}</button>
    </form>
  );
}

export default TeamForm;
