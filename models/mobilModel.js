const axios = require("axios"); 
const path = require("path");

const API_URL = "http://localhost:5199/api/Mobil";

exports.getAll = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data) ? response.data : []; 
  } catch (error) {
    console.error("Error fetching all Mobil:", error.message);
    return [];
  }
};

exports.getById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Mobil by ID ${id}:`, error);
    return null;
  }
};

exports.add = async (newMobil) => {
  try {
    const response = await axios.post(API_URL, newMobil);
    return response.data;
  } catch (error) {
    console.error("Error adding Mobil:", error);
    return null;
  }
};

exports.update = async (idMobil, updatedMobil) => {
  try {
    const response = await axios.put(`${API_URL}/${idMobil}`, updatedMobil);
    console.log(response)
    return response.data;
  } catch (error) {
    return null;
  }
};

exports.delete = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting Mobil ID ${id}:`,
      error.response?.data || error.message
    );
    return false;
  }
};
