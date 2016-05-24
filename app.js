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
    embedJSON["type"] = "rich"
    embedJSON["version"] = "1.0"
    embedJSON["width"] = "100%"
    embedJSON["height"] = 400
    embedJSON["title"] = "MathEmbed"
    embedJSON["description"] = "An app for Math"
    embedJSON["thumbnail_url"] = "https://mathembed.herokuapp.com/static/thumb.png"
    embedJSON["html"] = "<iframe width=\"100%\" height=\"400\" scrolling=\"no\" frameborder=\"no\" src=\"" + req.query.url+"\"></iframe>"
    res.json(embedJSON)

    // var x = {
    //     "version": 1,
    //     "type": "rich",
    //     "provider_name": "SoundCloud",
    //     "provider_url": "http://soundcloud.com",
    //     "height": 400,
    //     "width": "100%",
    //     "title": "Flickermood by Forss",
    //     "description": "From the Soulhack album,&nbsp;recently featured in this ad <a href=\"https://www.dswshoes.com/tv_commercial.jsp?m=october2007\">https://www.dswshoes.com/tv_commercial.jsp?m=october2007</a> ",
    //     "thumbnail_url": "http://i1.sndcdn.com/artworks-000067273316-smsiqx-t500x500.jpg",
        // "html": "<iframe width=\"100%\" height=\"400\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F293&show_artwork=true\"></iframe>",
    //     "author_name": "Forss",
    //     "author_url": "https://soundcloud.com/forss"
    // }
    //
    // res.json(x)
})

app.listen(process.env.PORT || 3000)
