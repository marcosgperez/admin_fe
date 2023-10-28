import axios from 'axios';

const apiMockURL = `/mock/`
const apiURL = `https://gesto-api.vercel.app/api/v1`
const proxyUrl = "https://my-proxy-henna.vercel.app/api/proxy"
// const proxyUrl = "http://localhost:3001/api/proxy"

class ApiService {
    axios;
    externalId = "1"
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
                external_id: this.externalId
            }
        });

        //return this.axios.post(`/auth/login`, { email, password });
    }

    getUsers() {

        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/users/index?external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        });

        //return this.axios.get(`/users/index`, {});
    }
    getUserTypes() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/user-types/index?external_id=" + this.externalId,
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
                external_id: this.externalId
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
                external_id: this.externalId
            }
        })
    }

    getUserByID(id) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/users?id=" + id + "&external_id=" + this.externalId,
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
                external_id: this.externalId
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
                external_id: this.externalId
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
                external_id: this.externalId
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
                external_id: this.externalId
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
                external_id: this.externalId
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
                external_id: this.externalId
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
                external_id: this.externalId
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

        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/tasks/index?external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        });

        //return this.axios.get(`/users/index`, {});
    }
    getTaskTypes() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/task-types/index?external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }
    updateTaskTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/task-types/update",
            "auth": this.token,
            "data": {
                ...userTypes,
                external_id: this.externalId
            }
        })
    }

    deleteTaskTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/task-types/delete",
            "auth": this.token,
            "data": {
                ...userTypes,
                external_id: this.externalId
            }
        })
    }

    getTaskByID(id) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/tasks?id=" + id + "&external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }

    updateTaskByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "put",
            "url": apiURL + "/tasks/update",
            "auth": this.token,
            "data": {
                ...user,
                external_id: this.externalId
            }
        })
    }

    createTask(user) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/tasks/store",
            "auth": this.token,
            "data": {
                ...user,
                external_id: this.externalId
            }
        })
    }

    deleteTaskByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/tasks/delete",
            "auth": this.token,
            "data": {
                ...user,
                external_id: this.externalId
            }
        })
    }



    getEvents() {

        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/events/index?external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        });

        //return this.axios.get(`/users/index`, {});
    }
    getEventTypes() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/event-types/index?external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }
    updateEventTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/event-types/update",
            "auth": this.token,
            "data": {
                ...userTypes,
                external_id: this.externalId
            }
        })
    }

    deleteEventTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/event-types/delete",
            "auth": this.token,
            "data": {
                ...userTypes,
                external_id: this.externalId
            }
        })
    }

    getEventByID(id) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/events?id=" + id + "&external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }

    updateEventByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "put",
            "url": apiURL + "/events/update",
            "auth": this.token,
            "data": {
                ...user,
                external_id: this.externalId
            }
        })
    }

    createEvent(user) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/events/store",
            "auth": this.token,
            "data": {
                ...user,
                external_id: this.externalId
            }
        })
    }

    deleteEventByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/events/delete",
            "auth": this.token,
            "data": {
                ...user,
                external_id: this.externalId
            }
        })
    }


    getFacilities() {

        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/facilities/index" + this.externalId,
            // "url": apiMockURL + "facilities.json",
            "auth": this.token,
            "data": {}
        });

        //return this.axios.get(`/users/index`, {});
    }
    getFacilitieTypes() {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/facilities-types/index" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }
    updateFacilitieTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/facilitie-types/update",
            "auth": this.token,
            "data": {
                ...userTypes,
                external_id: this.externalId
            }
        })
    }

    deleteFacilitieTypes(userTypes) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/facilitie-types/delete",
            "auth": this.token,
            "data": {
                ...userTypes,
                external_id: this.externalId
            }
        })
    }

    getFacilitieByID(id) {
        return this.axios.post(proxyUrl, {
            "method": "get",
            "url": apiURL + "/facilities?id=" + id + "&external_id=" + this.externalId,
            "auth": this.token,
            "data": {}
        })
    }

    updateFacilitieByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "put",
            "url": apiURL + "/facilities/update",
            "auth": this.token,
            "data": {
                ...user,
                external_id: this.externalId
            }
        })
    }

    createFacilitie(user) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/facilities/store",
            "auth": this.token,
            "data": {
                ...user,
                external_id: this.externalId
            }
        })
    }

    deleteFacilitieByID(user) {
        return this.axios.post(proxyUrl, {
            "method": "post",
            "url": apiURL + "/facilities/delete",
            "auth": this.token,
            "data": {
                ...user,
                external_id: this.externalId
            }
        })
    }
    getUser() {
        return this.axios.get(`user.json`, { baseURL: apiMockURL });
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