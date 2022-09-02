const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const weather=require("../controllers/weatherController")
const memesTemplate=require("../controllers/memes")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

/////My assisgnment starting from here/////////
router.get("/cowin/vaccinationSessionByDistrictId", CowinController.vaccinationSessionByDistrictId)
router.get("/getWeather", weather.getWeather)
router.get("/getSortCity", weather.getSortCity)
router.post("/memes", memesTemplate.memes)

module.exports = router;