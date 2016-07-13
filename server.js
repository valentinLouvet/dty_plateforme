var express = require('express'),
    app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/src'));

app.get('/', function (req, res) {
    res.sendFile('index.html')
});

app.get('/userStats', function(req, res){
    res.sendFile(__dirname + '/src/html/userProfile/userStats.html')
});

app.get('/userBadges', function(req, res){
    res.sendFile(__dirname + '/src/html/userProfile/rewards.html')
});

// test de départ
app.get('/test', function (req, res){
    res.sendFile(__dirname+'/src/html/userProfile/test_beginning.html')
});

app.listen(3333, function () {
    console.log("Server launched on port 3333");
});

