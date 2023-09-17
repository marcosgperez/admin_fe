import { client } from '../../client';

export const authLogin = async (data) => {
    let res = { ok: 0, data: [], error: null };
    try {
        localStorage.setItem('Authorization', null);
        const response = await client.post('/api/auth/login', { ...data });
        if (response.status === 200 && response.data.access_token) {
            const token = response.data.access_token;
            localStorage.setItem('Authorization', token);
            res.data = response.data;
            res.ok = 1;
        } else {
            res.error = 'Wrong email or password';
        }
    } catch (error) {
        res.error = error.response.data.data;
    }
    return res;
};

export const me = async () => {
    let res = { ok: 0, data: [], error: null };
    try {
        const response = await client.get('/api/auth/me');
        if (response.status === 200) {
            console.log(JSON.stringify(response.data))
            localStorage.setItem('userDetails', JSON.stringify(response.data));
            res.data = response.data;
            res.ok = 1;
        } else {
            res.error = 'Wrong email or password';
        }
    } catch (error) {
        console.log(error.response.data.data);
        res.error = error.response.data.data;
    }
    return res;
}