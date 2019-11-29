const cloudinaryService = {
    uploadImage: function (data) {
        return fetch(`https://api.cloudinary.com/v1_1/dxxq5xtsy/upload`, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}

export default cloudinaryService;