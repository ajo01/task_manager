const express = require('express')
const User = require('../models/users')
const router = new express.Router()
const auth = require('../middleware/auth')


//create user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user.getPublicProfile(), token })
    } catch (e) {
        res.status(400).send()
    }
})

// update user by id 
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user)
            return res.status(404).send()

        res.send(user)
    } catch (e) {
        res.status(404).send(e)
    }
})

// logout
router.post('/users/logout', auth, async (req, res) => {
 try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()
    res.send()
 } catch (e) {
    res.status(500).send()
 }
}) 

// logout at all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
       req.user.tokens = []
       await req.user.save()
       res.send()
    } catch (e) {
       res.status(500).send()
    }
   }) 

// read all users
router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)

})

// read user by id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user)
            return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// delete user by id
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user)
            return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router