/*
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});
export const getTeams = () => api.get('/teams');
export const createTeam = (data) => api.post('/teams', data);
export const updateTeam = (id, data) => api.put(`/teams/${id}`, data);
export const deleteTeam = (id) => api.delete(`/teams/${id}`);

export const getPlayers = () => api.get('/players');
export const createPlayer = (data) => api.post('/players', data);
export const updatePlayer = (id, data) => api.put(`/players/${id}`, data);
export const deletePlayer = (id) => api.delete(`/players/${id}`);


export default api;
*/
import axios from 'axios';

// Creating an axios instance for API calls
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Flask server URL
});

// API calls for teams
export const getTeams = async () => {
  try {
    const response = await api.get('/teams');
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const createTeam = async (data) => {
  try {
    const response = await api.post('/teams', data);
    return response.data;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
};

export const updateTeam = async (id, data) => {
  try {
    const response = await api.put(`/teams/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating team with id ${id}:`, error);
    throw error;
  }
};

export const deleteTeam = async (id) => {
  try {
    await api.delete(`/teams/${id}`);
  } catch (error) {
    console.error(`Error deleting team with id ${id}:`, error);
    throw error;
  }
};

// API calls for players
export const getPlayers = async () => {
  try {
    const response = await api.get('/players');
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

export const createPlayer = async (data) => {
  try {
    const response = await api.post('/players', data);
    return response.data;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};

export const updatePlayer = async (id, data) => {
  try {
    const response = await api.put(`/players/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating player with id ${id}:`, error);
    throw error;
  }
};

export const deletePlayer = async (id) => {
  try {
    await api.delete(`/players/${id}`);
  } catch (error) {
    console.error(`Error deleting player with id ${id}:`, error);
    throw error;
  }
};

export default api;
