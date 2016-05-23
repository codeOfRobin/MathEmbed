var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var exphbs  = require('express-handlebars');
var katex = require('katex')
var url = require('url');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3000; // set our port

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static',express.static(__dirname + '/static'))


app.get('/',function (req,res)
{
    res.render('home')
})

app.post('/',function (req,res)
{
    res.redirect('/latex?inputText='+req.body.inputText)
})

app.get('/latex',function(req,res)
{
    console.log(req.query.inputText);
    console.log("yay");
    res.render('result')
})

app.get('/services/oembed',function (req,res)
{
    var url_parts = url.parse(req.query.inputText, true);
    var query = url_parts.query;
    console.log(query);
    var embedJSON = {}
    embedJSON["type"] = "rich"
    embedJSON["version"] = "1.0"
    embedJSON["html"] = <iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F293&show_artwork=true"></iframe>
    res.json(embedJSON)
})

app.listen(3000)
