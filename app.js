var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var katex = require('katex')
var url = require('url');

String.prototype.addSlashes = function()
{
    return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
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
    // var referrer = req.query.referrer
    // if(referrer)
    // {
        // console.log(decodeURIComponent(req.query.inputText))
        // console.log(decodeURI(req.query.referrer))
        // var actualURL = url.parse(referrer,true).query.url
        // var actualText = url.parse(actualURL,true)
        // console.log(actualText.query.inputText)
        // res.render('latex.jade',{inputText: actualText.query.inputText.addSlashes(), inputEmbedText: encodeURIComponent(actualText.query.inputText)})      
    // }
    // else
    // {
        console.log(req.query.inputText);
        console.log("yay");
        res.render('latex.jade',{inputText: req.query.inputText.addSlashes(), inputEmbedText: encodeURIComponent(encodeURIComponent(req.query.inputText))})    
    // }
})

app.get('/oembed',function (req,res)
{
    console.log(req.query.url);
    decodedURL = decodeURI(req.query.url)
    var embedJSON = {}
    embedJSON["provider_url"] = "https://mathembed.com"
    embedJSON["type"] = "rich"
    embedJSON["version"] = "1.0"
    embedJSON["width"] = 400
    embedJSON["height"] = 200
    embedJSON["html"] = "<iframe width=\"100%\" height=\"200\" scrolling=\"no\" frameborder=\"no\" src=\"" +(req.query.url)+"\"></iframe>"
    res.json(embedJSON)
})

app.listen(process.env.PORT || 3000)
