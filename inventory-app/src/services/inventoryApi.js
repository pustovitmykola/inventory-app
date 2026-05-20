const BASE_URL = 'http://localhost:3000';

export const getInventory = () =>
  fetch(`${BASE_URL}/inventory`).then(r => r.json());

export const getInventoryItem = (id) =>
  fetch(`${BASE_URL}/inventory/${id}`).then(r => r.json());

export const createInventory = (formData) =>
  fetch(`${BASE_URL}/register`, {
    method: 'POST',
    body: formData,
  }).then(r => r.json());

export const updateInventory = (id, data) =>
  fetch(`${BASE_URL}/inventory/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const updateInventoryPhoto = (id, formData) =>
  fetch(`${BASE_URL}/inventory/${id}/photo`, {
    method: 'PUT',
    body: formData,
  }).then(r => r.json());

export const deleteInventory = (id) =>
  fetch(`${BASE_URL}/inventory/${id}`, {
    method: 'DELETE',
  }).then(r => r.json());

export const getPhotoUrl = (id) => `${BASE_URL}/inventory/${id}/photo`;
