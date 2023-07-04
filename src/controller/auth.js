const {registerUser, loginUser, refreshToken, logoutUser} = require('../model/userModel')
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        repeat_password: Joi.ref("password")
    })

    const {error} = schema.validate(req.body, {abortEarly: false})
    if (error) {
        return res.status(400).send({
            status: 'failed',
            message: error.details.map((err) => err.message)
        })
    }
    try {
        let {name, username, password} = req.body
        console.log(password)
        const result = await registerUser(name, username, password)
        res.send({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'failed',
            message: error.message
        })
    }
}

const login = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    const {error} = schema.validate(req.body, {abortEarly: false})
    if (error) {
        return res.status(400).send({
            status: 'failed',
            message: error.details.map((err) => err.message)
        })
    }
    try {
        const {username, password} = req.body
        const result = await loginUser(username, password)
        const token = jwt.sign({id: result.id, role: result.role}, process.env.access_token, {expiresIn: '1h'})
        res.send({
            status: 'success',
            message: 'User berhasil login',
            token: token,
        })
    } catch (error) {
        res.status(400).send({
            status: 'failed',
            message: error.message
        })
    }

}

module.exports = {
    register, login
}