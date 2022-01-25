const express = require('express')
const app = express()
const fs = require('fs')
const { uuid } = require('uuidv4')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const isLoggedIn = require('./middleware/authMiddleware')

app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', './public/views')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', isLoggedIn, (req, res) => {
    const { email } = req.query
    res.render('main', {
        pageTitle: "Main",
        isLoggedIn,
        email: req.cookies['email']
    })
})

app.get('/games', isLoggedIn, (req, res) => {
    res.render('games', {
        pageTitle: "Game"
    })
})

app.get('/login', (req, res) => {
    const{status} = req.query
    res.render('login', {
        pageTitle: "Login",
        status
    })
})

app.get('/signup', (req, res) => {
    res.render('signup', {
        pageTitle: "Sign Up"
    })
})

app.post('/signup', (req,res) => {
    const { email, password } = req.body
    const data = fs.readFileSync('./data/user.json','utf-8')
    const dataParsed = data.length ? JSON.parse(data) : []
    const newData = {
        id : uuid(),
        email,
        password
    }
    dataParsed.push(newData)
    fs.writeFileSync('./data/user.json', JSON.stringify(dataParsed, null, 4))
    res.redirect('/login')
    
    
})

app.post('/login', (req, res) =>{
    const { email, password} = req.body
    const data = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))
    const userMatch = data.find((item) => item.email === email)
    if(!userMatch) {
        res.redirect('/login?status=emailnotfound')
    } else {
        if(password === userMatch.password) {
            const token = jwt.sign({
                email: userMatch.email,
                id: userMatch.id
            }, 'secret', {
                expiresIn: 60*60*24
            })
            res.cookie('jwt', token, {maxAge: 1000*60*60*24})
            res.cookie('id', userMatch.id, { maxAge: 1000 * 60 * 60 * 24 })
            res.cookie('email', userMatch.email)
            res.redirect('/')
        } else {
            res.redirect('/login?status=wrongpassword')
        }
    }
})

app.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 5000 })
    res.redirect('/login')
  })


port = 5000
app.listen(port, () => {
    console.log('server is running at http://localhost:'+port)
})