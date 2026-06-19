import api from './axiosConfig';

export async function createEvent(eventData) {
  const res = await api.post('/api/calendar-events', eventData);
  return res.data;
}

export async function getUserEvents(userId) {
  const res = await api.get(`/api/calendar-events/user/${userId}`);
  return res.data;
}

export async function getEventsByDate(userId, date) {
  const res = await api.get(`/api/calendar-events/user/${userId}/date/${date}`);
  return res.data;
}

export async function updateEvent(id, eventData) {
  const res = await api.put(`/api/calendar-events/${id}`, eventData);
  return res.data;
}

export async function deleteEvent(id) {
  await api.delete(`/api/calendar-events/${id}`);
}

export async function getTasksByDate(userId, date) {
  const res = await api.get(`/api/tasks/user/${userId}/date/${date}`);
  return res.data;
}

export async function getUserTasks(userId) {
  const res = await api.get(`/api/tasks/user/${userId}`);
  return res.data;
}
