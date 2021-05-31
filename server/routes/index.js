const bodyParser = require('body-parser');
const {query} = require('express');
const express = require('express');
const weather = require('./weather');


const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}))

router.post('/weather', (req, res) => {
    console.log("weather와 연결합니다.");
    weather(req.body, (error, {weather} = {})=> {
        if (error){
            console.log("weather에서 error~~");
            return res.send({error});
        }
        return res.send(weather);
    })
})

module.exports = router;