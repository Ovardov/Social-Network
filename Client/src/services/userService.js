const postService = {
    loadUser: (username, searchName, limit) => {
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

        return fetch(`http://localhost:3001/api/user${query}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    loadSuggestedFriends: (expectedFriends) => {
        let query = `username=${expectedFriends}`

    return fetch(`http://localhost:3001/api/user/suggested?${query}`, {
            method: 'GET'
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

    addFriend(id) {
        return fetch(`http://localhost:3001/api/user/add-friend/${id}`, {
            method: 'POST',
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    removeFriend(id) {
        return fetch(`http://localhost:3001/api/user/remove-friend/${id}`, {
            method: 'POST',
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
    },

    logout: function () {
        return fetch(`http://localhost:3001/api/user/logout`, {
            method: 'POST',
            credentials: 'include'
        })
            .then(res => res.text())
            .catch(err => console.error(err));
    },
}

export default postService;