let express = require('express');
let mongoose = require('mongoose');
let bodyparser = require('body-parser');
let cors = require('cors');
let path = require('path');

let app = express();

const route = require('./routes/route')

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/meancontacts');

mongoose.connection.on('connected',()=>{
    console.log('connected to modb @ 27017')
}, {useNewUrlParser: true})

mongoose.connection.on('error',(err)=>{
    if (err)
    console.log('not connected! '+err)
})

const port = 3000;

//testing server
app.get('/', (req, res)=>{
    res.send("it's goooood")
})

app.use(cors());

app.use(bodyparser.json());

//push all the api calls to this file
app.use('/api', route); 

//static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, ()=>{
    console.log('server started at port: '+port);
})