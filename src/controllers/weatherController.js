let axios = require("axios")
let getWeather = async function (req, res) {
    try {
        let country = req.query.q
        let key = req.query.appid

        console.log(`query is : ${country} ${key}`)
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${key}`

        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let getSortCity = async function (req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        emptyObj = []
        for (i = 0; i < cities.length; i++) {
            let obj = { city:cities[i] }

            let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=07757f9ba405fe1808b87ba1726b649e`)
            console.log(res.data.main.temp)
            obj.temp = res.data.main.temp
            emptyObj.push(obj)
        }
        let sortedCitiesWithTemp=emptyObj.sort(function(a,b) {return a.temp-b.temp})
        console.log(sortedCitiesWithTemp)
        res.status(200).send({ msg: sortedCitiesWithTemp})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getWeather = getWeather
module.exports.getSortCity = getSortCity