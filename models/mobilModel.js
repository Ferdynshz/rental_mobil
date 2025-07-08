const fs = require('fs-extra');
const path = require('path');
const dataFile = path.join(__dirname, '../data/mobils.json');

async function getAllMobils() {
  const data = await fs.readJSON(dataFile);
  return Array.isArray(data) ? data : []; // pastikan bentuknya array
}

async function addMobil(data) {
  const mobils = await getAllMobils();
  mobils.push(data);
  await fs.writeJSON(dataFile, mobils, { spaces: 2 });
}

async function findMobilById(id) {
  const mobils = await getAllMobils();
  return mobils.find(m => m.id === id);
}

async function updateMobil(id, newData) {
  const mobils = await getAllMobils();
  const index = mobils.findIndex(m => m.id === id);
  if (index !== -1) {
    mobils[index] = { ...mobils[index], ...newData };
    await fs.writeJSON(dataFile, mobils, { spaces: 2 });
    return true;
  }
  return false;
}

async function deleteMobil(id) {
  const mobils = await getAllMobils();
  const filtered = mobils.filter(m => m.id !== id);
  if (filtered.length === mobils.length) return false;
  await fs.writeJSON(dataFile, filtered, { spaces: 2 });
  return true;
}

module.exports = {
  getAllMobils,
  addMobil,
  findMobilById,
  updateMobil,
  deleteMobil
};
