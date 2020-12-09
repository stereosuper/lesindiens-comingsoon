require('dotenv').config();
const axios = require('axios');
exports.handler = async function(event, context, callback) {
    const body = 'grant_type=client_credentials';

    const { data } = await axios.post('https://accounts.spotify.com/api/token', body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: '26a0181d60cb4cd7a616d5d028eb6aa3',
            password: process.env.SPOTIFY_SECRET
        }
    });

    const token = data.access_token;
    const id = JSON.parse(event.body).id;

    try {
        const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const response = {
            track: data
        };

        callback(null, {
            statusCode: 200,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(response)
        });
    } catch (error) {
        console.log(error);
        callback(null, {
            statusCode: 200,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(error)
        });
    }
};
