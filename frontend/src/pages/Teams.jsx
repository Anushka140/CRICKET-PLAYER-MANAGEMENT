import React, { useEffect, useState } from 'react';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';
import api from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error state
  // fetch teams from api
  /* this is comment-out for now

  const fetchTeams = async () => {
    const res = await api.get('/teams/');
    setTeams(res.data);
  };
  */

 const fetchTeams = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const res = await api.get('/teams/');
      setTeams(res.data);
    } catch (err) {
      setError('Error fetching teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // handle add or update team
  /* comment-out for now

  const handleAddOrUpdate = async (teamData) => {
    if (teamData.id) {
      await api.put(`/teams/${teamData.id}`, teamData);
    } else {
      await api.post('/teams/', teamData);
    }
    fetchTeams();
  };

  */
 /*
  const handleAddOrUpdate = async (teamData) => {
    setLoading(true);
    setError(null); // Reset error before making request
    try {
      if (teamData.id) {
        await api.put(`/teams/${teamData.id}`, teamData);
      } else {
        await api.post('/teams/', teamData);
      }
      fetchTeams();
    } catch (err) {
      setError('Error saving team');
    } finally {
      setLoading(false);
    }
  };
  */

// handle delete team
/* comment out for now

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      await api.delete(`/teams/${id}`);
      fetchTeams();
    }
  };
  */
 /*
 const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      setLoading(true);
      setError(null); // Reset error before making request
      try {
        await api.delete(`/teams/${id}`);
        fetchTeams();
      } catch (err) {
        setError('Error deleting team');
      } finally {
        setLoading(false);
      }
    }
  };
  */
//handle edit team
/*
  const handleEdit = (team) => {
    setSelectedTeam(team);
  };
*/
  //return (
    //<div>
      //<h2>Manage Teams</h2>
      //{loading && <p>Loading...</p>} {/* Show loading indicator */}
      //{error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
     // <TeamForm onSubmit={handleAddOrUpdate} selectedTeam={selectedTeam} clearSelection={() => setSelectedTeam(null)} />
      //<TeamList teams={teams} onEdit={handleEdit} onDelete={handleDelete} />
    //</div>
  //);
//}

//export default Teams;
// Add or update a team
  const handleAddOrUpdate = async (formData) => {
    const teamData = {
      team_name: formData.name,
      city: formData.city,
      coach: formData.coach,
      founded_year: formData.founded_year,
    };

    setLoading(true);
    setError(null);
    try {
      if (formData.id) {
        // If updating, include ID in request
        await api.put(`/teams/${formData.id}`, teamData);
      } else {
        // Else, create new team
        await api.post('/teams/', teamData);
      }
      fetchTeams();
    } catch (err) {
      console.error('Error saving team:', err);
      setError('Error saving team');
    } finally {
      setLoading(false);
    }
  };

  // Delete a team
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      setLoading(true);
      setError(null);
      try {
        await api.delete(`/teams/${id}`);
        fetchTeams();
      } catch (err) {
        console.error('Error deleting team:', err);
        setError('Error deleting team');
      } finally {
        setLoading(false);
      }
    }
  };

  // Select a team for editing
  const handleEdit = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div>
      <h2>Manage Teams</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <TeamForm
        onSubmit={handleAddOrUpdate}
        selectedTeam={selectedTeam}
        clearSelection={() => setSelectedTeam(null)}
      />

      <TeamList
        teams={teams}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Teams;
