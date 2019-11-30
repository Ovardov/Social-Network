const weatherService = {
    loadWeather: function (city) {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=54a297e7984659eb369704a7a60ba559`, {
            method: 'GET'
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}

export default weatherService;