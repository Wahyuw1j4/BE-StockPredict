const express = require('express')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const {register, login} = require('./src/controller/auth')
const {saveStock,
  saveReqStock,
  getStocks,
  getReqStocks,
  updateStocks,
  deleteStocks,
  deleteReqStocks} = require('./src/controller/stock')

const {verifyRefreshToken} = require('./src/controller/middleware/index')



const cors = require('cors')
const { verifyToken } = require('./src/controller/middleware')

const host = "127.0.0.1"
const port = 4140
dotenv.config()

app = express()
app.use(bodyparser.json())

const allowedOrigins = [  'http://192.168.8.103:8010', 'http://localhost:8010', "http://127.0.0.1:5173","http://127.0.0.1:4174" ,'https://stockpredict.wahyuwijaya.com/', 'https://www.stockpredict.wahyuwijaya.com/',  "http://103.31.38.120", 'https://api.stockpredict.wahyuwijaya.com', 'https://www.api.stockpredict.wahyuwijaya.com'];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/register', register)
app.post('/login', login)

app.post('/stock', verifyToken, saveStock)
app.get('/stock', verifyToken, getStocks)
app.put('/stock/:id', verifyToken, updateStocks)
app.delete('/stock/:id', verifyToken, deleteStocks)
app.get('/request', verifyToken, getReqStocks)
app.post('/request', verifyToken, saveReqStock)
app.delete('/request/:id', verifyToken, deleteReqStocks)

app.listen(port, () => {
    console.log(`Sistem Berjalan di http://${host}:${port}`)
})
 