const postService = {
    loadUser: function (id) {
        let query = '';

        if(id) {
            query = `?id=${id}`;
        }

        return fetch(`http://localhost:3001/api/user${query}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}

export default postService;