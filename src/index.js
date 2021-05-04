const express = require('express')
require('./mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next)=>{
//     if(req.method === 'GET' || req.method === 'POST'||req.method === 'PATCH'||req.method === 'DELETE') {
//         res.status(503).send()
//     } else {
//         next()
//     }

// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

