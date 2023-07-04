const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const bearerToken = req.header('token')
    if (!bearerToken) {
        return res.status(401).send({
            status: 'failed',
            message: 'Access token not found'
        })
    }

    jwt.verify(bearerToken, process.env.access_token, (err, result) => {
        if (err) {
            return res.status(401).send({
                status: 'failed',
                message: err.message
            })
        }
        req.id = result.id
        next()
    })
}

module.exports = {
    verifyToken
}