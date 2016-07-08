var express = require('express'),
    app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/src'));

app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/src/html/signup.html')
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

app.get('/coachStats', function (req, res) {
    res.sendFile(__dirname + '/src/html/coachProfile/Statistics.html')
});

app.get('/coachStudents', function (req, res) {
    res.sendFile(__dirname + '/src/html/coachProfile/studentsListe.html')
});

app.get('/userProfile', function (req, res) {
    res.sendFile(__dirname + '/src/html/templates/profile.html')
});

app.get('/userBadges', function(req, res){
    res.sendFile(__dirname + '/src/html/templates/rewards.html')
});

app.get('/codingTests', function (req,res) {
    res.sendFile(__dirname+'/src/html/coding_tests.html')
});

app.get('/intro', function (req,res) {
    res.sendFile(__dirname+'/src/html/intro.html')
})

app.listen(3333, function () {
    console.log("Server launched on port 3333");
});

