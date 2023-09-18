import { client } from '../../client';

export const getRooms = async () => {
    let res = { ok: 0, data: [], error: null };
    try {
        let userDetails = localStorage.getItem("userDetails");
        if (!userDetails) {
            res.error = 'Error getting user details';
            return res;
        };
        userDetails = JSON.parse(userDetails).external_client_id;
        const response = await client.get(`/api/clients/rooms?external_id=${userDetails}`);
        if (response.status === 200) {
            res.data = response.data;
            res.ok = 1;
        } else {
            res.error = 'Wrong email or password';
        }
    } catch (error) {
    }
    return res;
}