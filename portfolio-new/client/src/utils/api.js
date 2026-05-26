import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Public Endpoints ──
export const getProfile      = ()       => API.get('/profile');
export const getProjects     = (params) => API.get('/projects', { params });
export const getSkills       = ()       => API.get('/skills');
export const getExperience   = ()       => API.get('/experience');
export const getTestimonials = ()       => API.get('/testimonials');
export const sendContact     = (data)   => API.post('/contact', data);

// ── Auth Endpoints ──
export const login = (data) => API.post('/auth/login', data);
export const getMe = ()     => API.get('/auth/me');

// ── Admin Endpoints (protected) ──
export const createProject  = (data)     => API.post('/projects', data);
export const updateProject  = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject  = (id)       => API.delete(`/projects/${id}`);

export const createSkill    = (data)     => API.post('/skills', data);
export const updateSkill    = (id, data) => API.put(`/skills/${id}`, data);
export const deleteSkill    = (id)       => API.delete(`/skills/${id}`);

export const createExperience = (data)     => API.post('/experience', data);
export const updateExperience = (id, data) => API.put(`/experience/${id}`, data);
export const deleteExperience = (id)       => API.delete(`/experience/${id}`);

export const updateProfile = (data) => API.post('/profile', data);

export const getMessages = ()    => API.get('/contact');
export const markRead    = (id)  => API.patch(`/contact/${id}/read`);

export const createTestimonial = (data)     => API.post('/testimonials', data);
export const updateTestimonial = (id, data) => API.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id)       => API.delete(`/testimonials/${id}`);

export default API;
