import axios from 'axios';

const apiMockURL = `/mock/`
const apiURL = `https://gesto-api.vercel.app/api/v1`
const proxyUrl = "https://my-proxy-henna.vercel.app/api/proxy"
// const proxyUrl = "http://localhost:3001/api/proxy"

class ApiService {
    axios;
    externalId = "hotel"
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
                password,
                external_client: this.externalId
            }
        });

        //return this.axios.post(`/auth/login`, { email, password });
    }

    getUsers() {

        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/users/index?external_client=" + this.externalId,
            "auth": this.token,
            "data": {}
        });

        //return this.axios.get(`/users/index`, {});
    }
    getUserTypes() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/user-types/index?external_client=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }
    updateUserTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/user-types/update",
            "auth": this.token,
            "data": {
                ...userTypes,
                external_client: this.externalId
            }
        })
    }

    deleteUserTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/user-types/delete",
            "auth": this.token,
            "data": {
                ...userTypes,
                external_client: this.externalId
            }
        })
    }

    getUserByID(id) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/users?id=" + id + "&external_client=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }

    updateUserByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "put",
            "url": apiURL + "/users/update",
            "auth": this.token,
            "data": {
                ...user,
                external_client: this.externalId
            }
        })
    }

    createUser(user) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/users/store",
            "auth": this.token,
            "data": {
                ...user,
                external_client: this.externalId
            }
        })
    }

    deleteUserByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/users/delete",
            "auth": this.token,
            "data": {
                ...user,
                external_client: this.externalId
            }
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
            "data": {
                ...roomTypes,
                external_client: this.externalId
            }
        });
        // return this.axios.get(`rooms.json`, { baseURL: apiMockURL });
    }

    deleteRoomsTypes(roomTypes) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/room-types/delete",
            "auth": this.token,
            "data": {
                ...roomTypes,
                external_client: this.externalId
            }
        });
        // return this.axios.get(`rooms.json`, { baseURL: apiMockURL });
    }
    getRooms() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/rooms/index?external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }

    updateRooms(roomObject) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/rooms/update",
            "auth": this.token,
            "data": {
                roomObject,
                external_client: this.externalId
            }
        })
    }
    deleteRooms(roomId) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/rooms/delete",
            "auth": this.token,
            "data": {
                roomId: roomId,
                external_client: this.externalId
            }
        })
    }

    getRoomCount() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/clients/rooms?external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }


    getTasks() {
        return this.axios.get(`tasks.json`, { baseURL: apiMockURL });
    }
    getTaskByID() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/tasks?id=" + this.id + "&external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }
    getEvents() {
        return this.axios.get(`events.json`, { baseURL: apiMockURL });
    }
    getEventByID() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/events?id=" + this.id + "&external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }
    updateEventByID(eventObj) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/events/update",
            "auth": this.token,
            "data": {
                ...eventObj,
                external_client: this.externalId
            }
        })
    }
    deleteEventByID(eventId) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/rooms/delete",
            "auth": this.token,
            "data": {
                eventId: eventId,
                external_client: this.externalId
            }
        })
    }
    updateEvents(events) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/events/update",
            "auth": this.token,
            "data": { 
                events,
                external_client: this.externalId
             }
        })
    }
    deleteEvents(eventId) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/events/delete",
            "auth": this.token,
            "data": {
                eventId: eventId,
                external_client: this.externalId
            }
        })
    }

    getUser() {
        return this.axios.get(`user.json`, { baseURL: apiMockURL });
    }
    getFacilities() {
        return this.axios.get(`facilities.json`, { baseURL: apiMockURL });
    }
    getFacilitieById() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/facilities?id=" + this.id + "&external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }

}

export default new ApiService();