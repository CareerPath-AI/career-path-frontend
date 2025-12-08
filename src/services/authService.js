const API_URL = 'http://localhost:8000';

export async function registerUser(email, name, password) {
  const response = await fetch(`${API_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, password }),
  });

  if (!response.ok) {
    throw new Error('Credenciais inválidas');
  }

  return await response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
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

export async function emailResetPassword(email) {
  const response = await fetch(`${API_URL}/api/v1/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('email inválido');
  }

  return await response.json();
}

export async function resetPassword(token, password) {
  const response = await fetch(`${API_URL}/api/v1/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reset_token: token,
      new_password: password
    }),
  });

  if (!response.ok) {
    throw new Error('senha inválida');
  }

  return await response.json();
}

export async function uploadResume(file) {
  const token = localStorage.getItem('access_token');
  
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/api/v1/resume/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erro ao fazer upload do currículo');
  }

  return await response.json();
}

export async function excludeUser(password) {
  const accessToken = localStorage.getItem('access_token');

  const response = await fetch(`${API_URL}/api/v1/users/me/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,   
    },
    body: JSON.stringify({ password }),
  });

  return response.json(); 
}

export async function EditUserName(name) {
  const accessToken = localStorage.getItem('access_token');

  const response = await fetch(`${API_URL}/api/v1/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,   
    },
    body: JSON.stringify({ name }),
  });

  return response.json(); 
}

export async function getDevelopmentTrails() {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch(`${API_URL}/development-trail/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar trilhas de desenvolvimento');
  }

  return await response.json();
}

export async function getDevelopmentTrailById(trailId) {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  const response = await fetch(`${API_URL}/development-trail/${trailId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Erro ao buscar trilha de desenvolvimento';
    
    if (response.status === 404) {
      errorMessage = 'Trilha não encontrada';
    } else if (response.status === 401) {
      errorMessage = 'Não autorizado';
    } else if (response.status === 403) {
      errorMessage = 'Acesso negado';
    }
    
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

export async function getTotalDevelopmentTrail() {
  const token = localStorage.getItem('access_token');

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  const response = await fetch(`${API_URL}/api/v1/development-trail/?skip=0&limit=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Erro ao buscar total de trilhas';

    if (response.status === 404) {
      errorMessage = 'Nenhuma trilha encontrada';
    } else if (response.status === 401) {
      errorMessage = 'Não autorizado';
    } else if (response.status === 403) {
      errorMessage = 'Acesso negado';
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return data.total_count; // <<< retorna APENAS isso
}

export async function getTotalAnalyzeResume() {
  const token = localStorage.getItem('access_token');

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  const response = await fetch(`${API_URL}/api/v1/analyze-resume/?skip=0&limit=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Erro ao buscar total de currículos';

    if (response.status === 404) {
      errorMessage = 'Nenhum currículo encontrado';
    } else if (response.status === 401) {
      errorMessage = 'Não autorizado';
    } else if (response.status === 403) {
      errorMessage = 'Acesso negado';
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return data.total_count; // <<< retorna APENAS isso
}

export async function getTotalInterviewGuide() {
  const token = localStorage.getItem('access_token');

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  const response = await fetch(`${API_URL}/api/v1/interview-guide/?skip=0&limit=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Erro ao buscar total de conversas';

    if (response.status === 404) {
      errorMessage = 'Nenhuma conversa encontrada';
    } else if (response.status === 401) {
      errorMessage = 'Não autorizado';
    } else if (response.status === 403) {
      errorMessage = 'Acesso negado';
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return data.total_count; // <<< retorna APENAS isso
}

export async function analyzeResume(file) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  if (!file) {
    throw new Error('Nenhum arquivo enviado');
  }

  const formData = new FormData();
  formData.append('file', file);  // nome esperado pelo backend (alterar se necessário)

  const response = await fetch(`${API_URL}/api/v1/analyze-resume/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // NÃO adicionar Content-Type aqui, o FormData define sozinho
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao enviar currículo para análise: ${errorText}`);
  }

  return await response.json(); // Deve retornar o ID da análise ou dados da análise
}

export async function analyzeInterviewGuide(job_description, file) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  if (!file) {
    throw new Error('Nenhum arquivo enviado');
  }

  const formData = new FormData();
  formData.append('job_description', job_description);  // nome esperado pelo backend (alterar se necessário)
  formData.append('file', file);  // nome esperado pelo backend (alterar se necessário)

  const response = await fetch(`${API_URL}/api/v1/interview-guide/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // NÃO adicionar Content-Type aqui, o FormData define sozinho
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao enviar currículo para análise: ${errorText}`);
  }

  return await response.json(); // Deve retornar o ID da análise ou dados da análise
}
