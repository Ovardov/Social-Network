const postService = {
    loadUser: function (username, searchName, limit, expectUsername) {
        let query = username || searchName || limit
            ? '?'
            : ''

        if (username) {
            query += `username=${username}`;
        }

        if (searchName) {
            query += `&name=${searchName}`
        }

        if (limit) {
            query += `&limit=${limit}`
        }

        if(expectUsername) {
            query += `&expectUsername=${expectUsername}`;
        }

        return fetch(`http://localhost:3001/api/user${query}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    update(data) {
        return fetch(`http://localhost:3001/api/user/${data.username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    addFriend(data) {
        return fetch(`http://localhost:3001/api/user/add-friend`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    auth() {
        return fetch(`http://localhost:3001/auth`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.status === 200 ? res.json() : res.text())
            .catch(err => console.error(err));
    },

    login: function (data) {
        return fetch(`http://localhost:3001/api/user/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.status === 200 ? res.json() : res.text())
            .catch(err => console.error(err));
    },

    register: function (data) {
        return fetch(`http://localhost:3001/api/user/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.status === 200 ? res.json() : res.text())
            .catch(err => console.error(err));

    }
}

export default postService;