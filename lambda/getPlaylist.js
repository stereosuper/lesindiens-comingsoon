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

    console.log(data['access_token']);

    const token = data['access_token'];

    const playlist = await axios.get('https://api.spotify.com/v1/playlists/2rZwMbw7oLAxljzoHqI8tV/tracks', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const response = {
        token,
        playlist: playlist.data
    };

    callback(null, {
        statusCode: 200,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(response)
    });

    // axios
    //     .get('', {
    //         headers: {
    //             Authorization: 'Bearer ' + process.env.WORKABLE_TOKEN
    //         }
    //     })
    //     .then(res => {
    //         callback(null, {
    //             statusCode: 200,
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify(res.data.jobs.filter(job => job.state === 'published').reverse())
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         callback(null, {
    //             statusCode: 404,
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: 'non'
    //         });
    //     });
};
