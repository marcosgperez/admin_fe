import axios from 'axios';

const apiMockURL = `/mock/`
const apiURL = `https://gesto-api.vercel.app/api/v1`
const proxyUrl = "https://my-proxy-henna.vercel.app/api/proxy"
// const proxyUrl = "http://localhost:3001/api/proxy"

class ApiService {
    axios;
    constructor() {
        this.axios = axios.create({
            baseURL: apiURL,
            withCredentials: false,
        });
    }

    doLogin(email, password) {
        
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/auth/login",
            "data": {
                email,
                password
            }
        });
        
        //return this.axios.post(`/auth/login`, { email, password });
    }

    getUsers() {
        
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/users/index",
            "data": {}
        });
        
        //return this.axios.get(`/users/index`, {});
    }

    getRooms() {
        return this.axios.get(`rooms.json`, { baseURL: apiMockURL });
    }

    getTasks() {
        return this.axios.get(`tasks.json`, { baseURL: apiMockURL });
    }
    
    getEvents() {
        return this.axios.get(`events.json`, { baseURL: apiMockURL });
    }

    getUser() {
        return this.axios.get(`user.json`, { baseURL: apiMockURL });
    }
    getFacilities() {
        return this.axios.get(`facilities.json`, { baseURL: apiMockURL });
    }
  
}

export default new ApiService();