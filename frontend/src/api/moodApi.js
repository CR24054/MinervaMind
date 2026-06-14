const API_BASE_URL = "http://localhost:8080/api/moods";

export async function createMood(moodData) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(moodData),
  });

  if (!response.ok) {
    throw new Error(`Error al guardar el estado de ánimo (${response.status})`);
  }

  return response.json();
}

export async function getSummary(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}/summary`);

  if (!response.ok) {
    throw new Error(`Error al obtener el resumen (${response.status})`);
  }

  return response.json();
}

export async function getRecommendation(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}/recommendation`);

  if (!response.ok) {
    throw new Error(`Error al obtener la recomendación (${response.status})`);
  }

  return response.json();
}

export async function getMoodsByUser(userId) {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`);

  if (!response.ok) {
    throw new Error(`Error al obtener el historial (${response.status})`);
  }

  return response.json();
}

export async function updateMood(id, moodData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(moodData),
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar el registro (${response.status})`);
  }

  return response.json();
}

export async function deleteMood(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar el registro (${response.status})`);
  }
}