const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const env = require('./env')
const mongoose = require('mongoose')


const navLink = require('./models/navLinks/nav_links')


mongoose.connect(env.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.post('/navlinks', (req, res) => {
    
    navLink.create({
        navLink: req.body.navLink,
        navUrl: req.body.navUrl
    }, (err, newLink) => {
        if(!err){
            console.log(newLink)
            res.json({message: 'Link Created'})
        }
    })
});

app.get('/', (req, res) => {
    var navLinks = GetLinks()
    console.log(navLinks);
    
    res.render('home', {navLinks})
})

app.listen(env.port, () => {
    console.log('Server Up');
    
})

function GetLinks(){
    navLink.find({}, (err,navlinks) => {
        if(err){
            return err
        } else {
            return navlinks
        }
    })
}