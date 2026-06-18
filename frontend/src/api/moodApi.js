import api from './axiosConfig';

export async function createMood(moodData) {
  try {
    const response = await api.post('/api/moods', moodData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al guardar el estado anímico`);
  }
}

export async function getMoodSummary(userId) {
  try {
    const response = await api.get(`/api/moods/user/${userId}/summary`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el resumen`);
  }
}

export async function getMoodRecommendation(userId) {
  try {
    const response = await api.get(`/api/moods/user/${userId}/recommendation`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener la recomendación`);
  }
}

export async function getMoodByUser(userId) {
  try {
    const response = await api.get(`/api/moods/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el historial`);
  }
}

export async function updateMood(id, moodData) {
  try {
    const response = await api.put(`/api/moods/${id}`, moodData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar el registro`);
  }
}

export async function deleteMood(id) {
  try {
    await api.delete(`/api/moods/${id}`);
  } catch (error) {
    throw new Error(`Error al eliminar el registro`);
  }
}