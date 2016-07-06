var express = require('express'),
    app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/src'));

app.get('/signin', function (req, res) {
    res.sendFile(__dirname + '/src/html/signin.html')
});

app.get('/cours', function (req, res) {
    res.sendFile(__dirname + '/src/html/templates/coursSuivi.html')
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/html/home.html')
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/src/html/login.html')
});

app.get('/coach/profile/stats', function (req, res) {
    res.sendFile(__dirname + '/src/html/coachProfile/Statistics.html')
});

app.get('/coach/profile/students', function (req, res) {
    res.sendFile(__dirname + '/src/html/coachProfile/studentsListe.html')
});

app.get('/user/profile', function (req, res) {
    res.sendFile(__dirname + '/src/html/templates/profile.html')
});


app.listen(3333, function () {
    console.log("serveur lancé");
});