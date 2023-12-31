const { executeQuery } = require('./config/mysql.js')
const { nanoid } = require('nanoid')

const addStock = (ticker, nameStock) => {
    return new Promise((resolve, reject) => {
        const id = nanoid(10);
        const checkQuery = "SELECT COUNT(*) AS count FROM stock WHERE ticker = ?";
        executeQuery(checkQuery, [ticker], (checkErr, checkResult) => {
            if (checkErr) {
                reject(checkErr);
                return;
            }

            const stockExists = checkResult[0].count > 0;

            if (stockExists) {
                const errorMessage = "Stock with the provided ticker already exists.";
                reject(new Error(errorMessage));
            } else {
                const insertQuery = "INSERT INTO stock (id, ticker, name_stock) VALUES (?, ?, ?)";
                executeQuery(insertQuery, [id, ticker, nameStock], (insertErr, insertResult) => {
                    if (insertErr) {
                        reject(insertErr);
                    } else {
                        resolve(insertResult);
                    }
                });
            }
        });
    });
};

const requestStock = (ticker, nameStock, reason) => {
    return new Promise((resolve, reject) => {
        const id = nanoid(10)
        console.log(id, "dari request stock")
        const query = "INSERT INTO request_stock (id, ticker, name_stock, reason) VALUES (?,?,?,?)"
        executeQuery(query, [id, ticker, nameStock, reason], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const getStock = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM stock"
        executeQuery(query, [], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const getReqStock = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM request_stock"
        executeQuery(query, [], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const updateStock = (id, ticker, nameStock) => {
    return new Promise((resolve, reject) => {
        const queryId = "SELECT * FROM stock WHERE id = ?"
        executeQuery(queryId, [id], (err, result) => {
            if (err) reject(err)
            if (result.length === 0) {
                reject(new Error("Stock tidak ditemukan"))
            } else {
                const query = "UPDATE stock SET ticker = ?, name_stock = ? WHERE id = ?"
                executeQuery(query, [ticker, nameStock, id], (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            }
        })
    })
}

const deleteStock = (id) => {
    return new Promise((resolve, reject) => {
        const queryId = "SELECT * FROM stock WHERE id = ?"
        executeQuery(queryId, [id], (err, result) => {
            if (err) reject(err)
            if (result.length === 0) {
                reject(new Error("Stock tidak ditemukan"))
            } else {
                const query = "DELETE FROM stock WHERE id = ?"
                executeQuery(query, [id], (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            }
        })
    })
}

const deleteReqStock = (id) => {
    return new Promise((resolve, reject) => {
        const queryId = "SELECT * FROM request_stock WHERE id = ?"
        executeQuery(queryId, [id], (err, result) => {
            if (err) reject(err)
            if (result.length === 0) {
                reject(new Error("Request tidak ditemukan"))
            } else {
                const query = "DELETE FROM request_stock WHERE id = ?"
                executeQuery(query, [id], (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            }
        })
    })
}

module.exports = {
    addStock,
    requestStock,
    getStock,
    getReqStock,
    updateStock,
    deleteStock,
    deleteReqStock
}