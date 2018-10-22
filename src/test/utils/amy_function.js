const axios = require('axios');
//jest doesn't use ES6 imports so we use module.export
let uniqueUser = 0;
module.exports = {
    allUsers: () => {
        return axios.get('http://localhost:3456/api/all-users').then(res => {
            return res.data
        })
    },
    userById: () => {
        return axios.get('http://localhost:3456/api/user/30').then(res => {
            return res.data
        })
    },
    loggedIn: () => {
        let username = 'ross' + uniqueUser;
        let password = 'nope';
        let img = `https://robohash.org/${username}`;
        uniqueUser++;
        return axios.post('http://localhost:3456/api/new-user', { username, password, img }).then(res => {
            return res.data
        })
    }

}