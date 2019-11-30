const postService = {
    loadPosts: function (id) {
        let query = '';

        if(id) {
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
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}

export default postService;