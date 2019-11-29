const postService = {
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