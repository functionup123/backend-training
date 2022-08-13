const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require("mongoose");
const route = require('./routes/route.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://komal:MoWEjgQO5fVymmFq@cluster0.2kvjrvq.mongodb.net/test"
,{
    useNewUrlParser: true
}
).then( () => {console.log( "Mongodb is connected")})
.catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
