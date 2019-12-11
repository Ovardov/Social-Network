const commentService = {
    addComment: function (postId, data) {
        return fetch(`http://localhost:3001/api/comment/${postId}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    editComment: function (commentId, data) {
        return fetch(`http://localhost:3001/api/comment/${commentId}`, {
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

    deleteComment: function (commentId) {
        return fetch(`http://localhost:3001/api/comment/${commentId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}

export default commentService;