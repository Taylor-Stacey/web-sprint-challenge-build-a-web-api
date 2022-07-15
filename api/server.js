const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(express.json());

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req,res)=>{
    res.send(`<h2>the middle of ware!</h2>`);
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;

// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')

// const server = express()

// server.use(express.json())
// server.use(cors())

// server.get('/api/hello', (req,res)=>{
//     res.json({ message: 'api is working!'})
// })

// server.use('*', (req, res)=> {
//     res.send(`<h1>Hello, there!</h1>`)
// })

// server.use((err,req,res,next)=>{
//     res.status(500).json({
//         message: err.message,
//         stack: err.stack,
//     })
// })
