import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de resposta para detectar erro de token expirado (401)
api.interceptors.response.use(
  (response) => response, // Retorna a resposta normalmente se estiver bem-sucedida
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se o token expirou ou é inválido, remove o token e redireciona para login
      localStorage.clear(); // Limpa todos os dados armazenados no navegador
      window.location.href = "/"; // Redireciona para a tela de login
    }
    return Promise.reject(error); // Rejeita o erro para ser tratado posteriormente
  }
);

export default api;
