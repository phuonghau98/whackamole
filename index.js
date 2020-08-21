const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Score = require('./models/Score');

mongoose.connect(
    'mongodb+srv://whackamole:whackamole@cluster0.tszo9.gcp.mongodb.net/whackamole?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'whackamole'
    }
).then(() => {
    console.log('Database connected')
}).catch((err) => {
    console.log('Cannot connect to database')
    console.log(err)
});


const app = express()
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')))

app.post('/api/v1/submit/score', async (req, res) => {
    console.log(req.body)
    new Score({
        name: req.body.name,
        score: req.body.score,
        created_at: +new Date()
    }).save().then(() => {
        res.end('Success')
    }).catch(() => {
        res.end('Error')
    })
})

app.get('/api/v1/scores', async (req, res) => {
    // Get top 10 scores
    Score.find({ }).sort('score').limit(10).then((data) => {
        res.end(JSON.stringify(data))
    }).catch((err) => {
        res.end(JSON.stringify({
            error: 'Cannot get top 10'
        }))
    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})



app.listen(process.env.PORT || 8080, () => {
    console.log('App is up and running on port 8080')
})