const mongoose = require('mongoose')
const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')



userRouter.post('/', async(request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        return response.status(400).json({ error: `User validation failed: username: Path password is shorter than the minimum allowed length (3)` })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)


})

userRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
    response.json(users)
})
module.exports = userRouter