import React, { useEffect, useState } from 'react';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';
import api from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const fetchTeams = async () => {
    const res = await api.get('/teams/');
    setTeams(res.data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleAddOrUpdate = async (teamData) => {
    if (teamData.id) {
      await api.put(`/teams/${teamData.id}`, teamData);
    } else {
      await api.post('/teams/', teamData);
    }
    fetchTeams();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      await api.delete(`/teams/${id}`);
      fetchTeams();
    }
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div>
      <h2>Manage Teams</h2>
      <TeamForm onSubmit={handleAddOrUpdate} selectedTeam={selectedTeam} clearSelection={() => setSelectedTeam(null)} />
      <TeamList teams={teams} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Teams;
