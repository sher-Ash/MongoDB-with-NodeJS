var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var path = require('path')
var app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect("mongodb://127.0.0.1:27017/Student", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var db = mongoose.connection
db.on('error', () => console.log('Error Connecting!'))
db.once('open', () =>
    console.log("Connected to DB")
)
app.post('/sign_up', (req, res) => {
    var name = req.body.name
    var course = req.body.course
    var age = req.body.age
    var email = req.body.email
    var data = {
        "name": name,
        "course": course,
        "age": age,
        "email": email
    }
    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Student detail Inserted successfully!");
    });
    return res.redirect('sign_up_success.html')
})
app.get('/', function (req, res) {
    res.send('Type /test in address bar to insert student details');
})
app.get('/test',(req,res)=>{
    res.render('test')
})
app.listen(2000,()=>console.log("Listening to port Number 2000"))



