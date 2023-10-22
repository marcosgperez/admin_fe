import axios from 'axios';

const apiMockURL = `/mock/`
const apiURL = `https://gesto-api.vercel.app/api/v1`

class ApiService {
    axios;
    constructor() {
        this.axios = axios.create({
            baseURL: apiURL,
        });
    }

    doLogin(email, password) {
        return this.axios.post(`/auth/login`, { email, password });
    }

    getRooms() {
        return this.axios.get(`rooms.json`, { baseURL: apiMockURL });
    }

    getTasks() {
        return this.axios.get(`tasks.json`, { baseURL: apiMockURL });
    }

}

export default new ApiService();