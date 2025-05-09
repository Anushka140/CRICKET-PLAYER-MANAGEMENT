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
