const axios = require('axios')

module.exports = {
    login: function(username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                console.log(res.token);
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    },        
    
    logout: function() {
        delete localStorage.token
    },

    loggedIn: function() {
        return !!localStorage.token
    },

    getToken: function(username, pass, cb) {
        axios.post('/api-token-auth/',{username : username,
            password : pass})
            .then(res => {
                console.log(res);
                cb({
                    authenticated : true,
                    token : res.data.token                
                })
            })
            .catch(e => console.log(e));
    }, 
}