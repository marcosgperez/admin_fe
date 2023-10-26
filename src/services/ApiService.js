import axios from 'axios';

const apiMockURL = `/mock/`
const apiURL = `https://gesto-api.vercel.app/api/v1`
const proxyUrl = "https://my-proxy-henna.vercel.app/api/proxy"
// const proxyUrl = "http://localhost:3001/api/proxy"

class ApiService {
    axios;
    externalId = "Hotel"
    token = null

    constructor() {
        this.axios = axios.create({
            baseURL: apiURL,
            withCredentials: false,
        });
    }
    setToken(token) {
        this.token = `${token}`;
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
            "auth": this.token,
            "data": {}
        });

        //return this.axios.get(`/users/index`, {});
    }
    getUserTypes() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/user-types/index",
            "auth": this.token,
            "data": {}
        })
    }
    updateUserTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/user-types/update",
            "auth": this.token,
            "data": { ...userTypes }
        })
    }

    deleteUserTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/user-types/delete",
            "auth": this.token,
            "data": { ...userTypes }
        })
    }

    getUserByID(id) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/users?id=" + id,
            "auth": this.token,
            "data": {}
        })
    }

    updateUserByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "put",
            "url": apiURL + "/users/update",
            "auth": this.token,
            "data": { ...user }
        })
    }

    deleteUserByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/users/delete",
            "auth": this.token,
            "data": { ...user }
        })
    }

    getRoomsTypes() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/room-types/index/?external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        });
        // return this.axios.get(`rooms.json`, { baseURL: apiMockURL });
    }

    updateRoomsTypes(roomTypes) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/room-types/update",
            "auth": this.token,
            "data": { ...roomTypes }
        });
        // return this.axios.get(`rooms.json`, { baseURL: apiMockURL });
    }

    deleteRoomsTypes(roomTypes) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/room-types/delete",
            "auth": this.token,
            "data": { ...roomTypes }
        });
        // return this.axios.get(`rooms.json`, { baseURL: apiMockURL });
    }
    getRooms() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/rooms/index?external_id=1",
            "auth": this.token,
            "data": {}
        })
    }

    updateRooms() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/rooms/update",
            "auth": this.token,
            "data": {}
        })
    }
    deleteRooms() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/rooms/delete",
            "auth": this.token,
            "data": {}
        })
    }

    getRoomCount() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/clients/rooms?external_id=1",
            "auth": this.token,
            "data": {}
        })
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