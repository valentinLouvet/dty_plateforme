var express= require('express'),
    app=express();

app.use(express.static(__dirname));
app.use(express.static(__dirname+'/src'));

app.get('/', function (req,res) {
    res.sendFile(__dirname+'/src/html/login.html')
});

app.listen(3333);