const API_BASE_URL = "http://localhost:8080/api/sleep";

export async function createSleep(sleepData) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sleepData),
  });

  if (!response.ok) {
    throw new Error(`Error al guardar el registro de sueño (${response.status})`);
  }

  return response.json();
}

export async function getSleepSummary(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}/summary`);

  if (!response.ok) {
    throw new Error(`Error al obtener el resumen (${response.status})`);
  }

  return response.json();
}

export async function getSleepRecommendation(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}/recommendation`);

  if (!response.ok) {
    throw new Error(`Error al obtener la recomendación (${response.status})`);
  }

  return response.json();
}

export async function getSleepByUser(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`);

  if (!response.ok) {
    throw new Error(`Error al obtener el historial (${response.status})`);
  }

  return response.json();
}

export async function updateSleep(id, sleepData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sleepData),
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar el registro (${response.status})`);
  }

  return response.json();
}

export async function deleteSleep(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar el registro (${response.status})`);
  }
}