import api from './axiosConfig';

export async function createSleep(sleepData) {
  try {
    const response = await api.post('/api/sleep', sleepData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al guardar el registro de sueño`);
  }
}

export async function getSleepSummary(userId) {
  try {
    const response = await api.get(`/api/sleep/user/${userId}/summary`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el resumen`);
  }
}

export async function getSleepRecommendation(userId) {
  try {
    const response = await api.get(`/api/sleep/user/${userId}/recommendation`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener la recomendación`);
  }
}

export async function getSleepByUser(userId) {
  try {
    const response = await api.get(`/api/sleep/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el historial`);
  }
}

export async function updateSleep(id, sleepData) {
  try {
    const response = await api.put(`/api/sleep/${id}`, sleepData);
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar el registro`);
  }
}

export async function deleteSleep(id) {
  try {
    await api.delete(`/api/sleep/${id}`);
  } catch (error) {
    throw new Error(`Error al eliminar el registro`);
  }
}