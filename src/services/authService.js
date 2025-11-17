const API_URL = 'http://localhost:8000';

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Credenciais inválidas');
  }

  return await response.json();
}
