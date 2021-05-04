const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/users')

const main = async () => {
    // const task = await Task.findById('6091b551fad196855c359b50')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('6091b53efad196855c359b4d')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main()

