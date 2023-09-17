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
