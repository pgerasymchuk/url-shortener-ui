import axios from "axios";

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export const register = (data) => api.post("/Auth/register", data);
export const login = (data) => api.post("/Auth/login", data);
export const getMyUrls = () => api.get("/urls/my");
export const getAllUrls = () => api.get("/Admin/urls");
export const createUrl = (data) => api.post("/shorten", data);
export const getUrlDetails = (id) => api.get(`/urls/${id}`);
export const deleteUrl = (id) => api.delete(`/urls/${id}`);

export default api;
