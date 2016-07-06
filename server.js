var express= require('express'),
    app=express();

app.use(express.static(__dirname));
app.use(express.static(__dirname+'/src'));

app.get('/signin', function (req,res) {
    res.sendFile(__dirname+'/src/html/signin.html')
});


app.get('/cours', function (req,res) {
    res.sendFile(__dirname+'/src/html/templates/coursSuivi.html')
});

app.get('/', function (req,res) {
    res.sendFile(__dirname+'/src/html/home.html')
})
app.listen(3333);