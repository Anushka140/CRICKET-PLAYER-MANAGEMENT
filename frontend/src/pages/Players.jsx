/*
import React, { useEffect, useState } from 'react';
import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';
import api from '../api';

function Players() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);


  const fetchPlayers = async () => {
    const res = await api.get('/players/');
    setPlayers(res.data);
  };

  const fetchTeams = async () => {
    const res = await api.get('/teams/');
    setTeams(res.data);
  };

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const handleAddOrUpdate = async (playerData) => {
    if (playerData.id) {
      await api.put(`/players/${playerData.id}`, playerData);
    } else {
      await api.post('/players/', playerData);
    }
    fetchPlayers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      await api.delete(`/players/${id}`);
      fetchPlayers();
    }
  };

  const handleEdit = (player) => {
    setSelectedPlayer(player);
  };


  return (
    <div>
      <h2>Manage Players</h2>
      <PlayerForm teams={teams} onSubmit={handleAddOrUpdate} selectedPlayer={selectedPlayer} clearSelection={() => setSelectedPlayer(null)} />
      <PlayerList players={players} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Players;
*/

import React, { useEffect, useState } from 'react';
import PlayerList from '../components/PlayerList';  // Goes back to src then into components
import PlayerForm from '../components/PlayerForm';  // Goes back to src then into components



import api from '../api';

function Players() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const fetchPlayers = async () => {
    try {
      const res = await api.get('/players/');
      setPlayers(res.data);
    } catch (error) {
      console.error('Error fetching players:', error);
      alert('There was an error fetching the players');
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await api.get('/teams/');
      setTeams(res.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
      alert('There was an error fetching the teams');
    }
  };

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const handleAddOrUpdate = async (playerData) => {
    try {
      if (playerData.id) {
        await api.put(`/players/${playerData.id}`, playerData);
      } else {
        await api.post('/players/', playerData);
      }
      fetchPlayers();
    } catch (error) {
      console.error('Error adding or updating player:', error);
      alert('There was an error adding or updating the player');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await api.delete(`/players/${id}`);
        fetchPlayers();
      } catch (error) {
        console.error('Error deleting player:', error);
        alert('There was an error deleting the player');
      }
    }
  };

  const handleEdit = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div>
      <h2>Manage Players</h2>
      <PlayerForm teams={teams} onSubmit={handleAddOrUpdate} selectedPlayer={selectedPlayer} clearSelection={() => setSelectedPlayer(null)} />
      <PlayerList players={players} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Players;
