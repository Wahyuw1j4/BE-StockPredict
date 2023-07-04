const { executeQuery } = require("./config/mysql");
// const nanoid = require("nanoid");
var { nanoid } = require("nanoid");
const bcrypt = require('bcrypt');

const registerUser =  (name, username, password) => {
    return new Promise( async (resolve, reject) => {
        const query = "SELECT * FROM users WHERE username = ?"
        password = await bcrypt.hash(password, 10)
        const id = nanoid(10)
        executeQuery(query, [username], (err, result) => {
            if (err) reject(err)
            if (result.length > 0) {
                reject(new Error("Username sudah terdaftar"))
            } else {
                const query = "INSERT INTO users (id, name, username, password, role) VALUES (?,?,?,?,?)"
                executeQuery(query, [id, name, username, password, 1], (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            }
        })
    })
}

const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE username = ?"
        executeQuery(query, [username], async (err, result) => {
            if (err) reject(err)
            if (result.length === 0) {
                reject(new Error("Username tidak terdaftar"))
            } else {
                const user = result[0]
                const match = await bcrypt.compare(password, user.password)
                if (match) {
                    resolve(user)
                } else {
                    reject(new Error("Password salah"))
                }
            }
        })
    })
}

const refreshToken = (username, refreshToken) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO refresh_tokens (username, refresh_token) VALUES (?,?)"
        executeQuery(query, [username, refreshToken], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    }
)}

const logoutUser = (refreshToken) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM refresh_tokens WHERE refresh_token = ?"
        executeQuery(query, [refreshToken], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}


module.exports = {
    registerUser, loginUser, refreshToken, logoutUser
}