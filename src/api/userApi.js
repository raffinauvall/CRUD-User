import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users";

const userApi = {
    getAll: () => axios.get(API_URL),
    getID: (id) => axios.get(`${API_URL}/${id}`),
    create: (data) => axios.post(API_URL, data),
    update: (id, data) => axios.put(`${API_URL}/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/${id}`)
};

export default userApi;
