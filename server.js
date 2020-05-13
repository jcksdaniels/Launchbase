const express =  require('express')
const nunjucks = require('nunjucks')
const videos = require('./data')
const server = express()


server.use( express.static('public'))


server.set( 'view engine', 'njk')

/* Configuraçao da template Engine*/

nunjucks.configure('views', {
    express: server
})

server.get("/", function (req, res){

    const about = {
        avatar_url:'https://avatars2.githubusercontent.com/u/10780436?s=400&u=6673a5a27add0ab081ab17c78b3a078216b3cd44&v=4', 
        name: 'Daniel Cerqueira', 
        role:'Web developer', 
        description: 'Each little day goes a long way', 
        links:[
            {name:'Github', url:'https://github.com/jcksdaniels'}, 
            {name:'Twitter', url:'https://twitter.com/jcksdaniels'}, 
            {name: 'LinkedIn', url:'https://www.linkedin.com/in/jcksdaniels/'}
        ]
    }
    return res.render("about", {about})

})

server.get("/portfolio", function (req, res){
    return res.render("portfolio", { items: videos})
})

server.get('/video', function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        if(video.id == id){
            return true
        }
    })

    if (!video){
        return res.send('Video not found!')
    }

    return res.render('video', {item: video})
})

server.listen(5000, function(){
    console.log('server is running')
})