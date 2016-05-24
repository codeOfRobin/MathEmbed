var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var katex = require('katex')
var url = require('url');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3000; // set our port

app.set('view engine', 'jade');
app.use('/static',express.static(__dirname + '/static'))
app.set('views',__dirname + '/templates');

app.get('/',function (req,res)
{
    res.render('home.jade')
})

app.post('/',function (req,res)
{
    res.redirect('/latex?inputText='+req.body.inputText)
})

app.get('/latex',function(req,res)
{
    console.log(req.query.inputText);
    console.log("yay");
    res.render('latex.jade',{inputText: req.query.inputText})
})

app.get('/oembed',function (req,res)
{
    console.log(req.query.url);
    var embedJSON = {}
    embedJSON["provider_url"] = "https://mathembed.herokuapp.com"
    embedJSON["type"] = "photo"
    embedJSON["version"] = "1.0"
    embedJSON["width"] = "100%"
    embedJSON["height"] = 400
    embedJSON["thumbnail_url"] = "https://mathembed.herokuapp.com/static/output.svg"
    embedJSON["url"] = "https://mathembed.herokuapp.com/static/output.svg"
    res.json(embedJSON)
})

app.listen(process.env.PORT || 3000)
