const postService = {
    loadPosts: function (id) {
        let query = '';

        if (id) {
            query = `?id=${id}`;
        }

        return fetch(`http://localhost:3001/api/post${query}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    addPost: function (data) {
        return fetch(`http://localhost:3001/api/post`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.text())
            .catch(err => console.error(err));
    },

    addLike: function (postId) {
        return fetch(`http://localhost:3001/api/post/like/${postId}`, {
            method: 'PUT',
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    removeLike: function (postId) {
        return fetch(`http://localhost:3001/api/post/dislike/${postId}`, {
            method: 'PUT',
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deletePost: function (postId) {
        return fetch(`http://localhost:3001/api/post/${postId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => res.text())
            .catch(err => console.error(err));
    },

    editPost: function (postId, data) {
        return fetch(`http://localhost:3001/api/post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.text())
            .catch(err => console.error(err));
    }
}

export default postService;