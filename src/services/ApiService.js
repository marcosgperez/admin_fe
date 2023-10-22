import axios from 'axios';

const apiURL = `/mock/`

class ApiService {
    axios;
    constructor() {
        this.axios = axios.create({
            baseURL: apiURL,
        });
    }

    getRooms() {
        return this.axios.get(`rooms.json`);
    }

    getTasks() {
        return this.axios.get(`tasks.json`);
    }
    
    getEvents() {
        return this.axios.get(`events.json`);
    }

    getUser() {
        return this.axios.get(`user.json`);
    }
  
}

export default new ApiService();