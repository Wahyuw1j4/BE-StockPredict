const {
  addStock,
  requestStock,
  getStock,
  getReqStock,
  updateStock,
  deleteStock,
  deleteReqStock,
} = require("../model/stockModel");

const Joi = require("joi");

const saveStock = async (req, res) => {
    const schema = Joi.object({
        ticker: Joi.string().required(),
        name_stock: Joi.string().required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {   
        return res.status(400).send({
            status: "failed",
            message: error.details.map((err) => err.message),
        });
    }
    try {
        const { ticker, name_stock } = req.body;
        const result = await addStock(ticker, name_stock);
        res.send({
            status: "success",
            message: "Stock berhasil ditambahkan",
            data: result,
        });
    }
    catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message,
        });
    }
};

const saveReqStock = async (req, res) => {
    const schema = Joi.object({
        ticker: Joi.string().required(),
        name_stock: Joi.string().required(),
        reason: Joi.string().required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {   
        return res.status(400).send({
            status: "failed",
            message: error.details.map((err) => err.message),
        });
    }
    try {
        const { ticker, name_stock, reason } = req.body;
        const result = await requestStock(ticker, name_stock, reason);
        res.send({
            status: "success",
            message: "Stock berhasil ditambahkan",
            data: result,
        });
    }
    catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message,
        });
    }
}

const getStocks = async (req, res) => {
    try {
        const result = await getStock();
        res.send({
            status: "success",
            message: "Stock berhasil ditampilkan",
            data: result,
        });
    }
    catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message,
        });
    }
}

const getReqStocks = async (req, res) => {
    try {
        const result = await getReqStock();
        res.send({
            status: "success",
            message: "Stock berhasil ditampilkan",
            data: result,
        });
    }
    catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message,
        });
    }
}

const updateStocks = async (req, res) => {
    const schema = Joi.object({
        ticker: Joi.string().required(),
        name_stock: Joi.string().required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {   
        return res.status(400).send({
            status: "failed",
            message: error.details.map((err) => err.message),
        });
    }

    const id = req.params.id;
    try {
        const { ticker, name_stock } = req.body;
        const result = await updateStock(id, ticker, name_stock);
        res.send({
            status: "success",
            message: "Stock berhasil diupdate",
            data: result,
        });
    }
    catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message,
        });
    }
}

const deleteStocks = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteStock(id);
        res.send({
            status: "success",
            message: "Stock berhasil dihapus",
            data: result,
        });
    }
    catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message,
        });
    }
}

const deleteReqStocks = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteReqStock(id);
        res.send({
            status: "success",
            message: "Stock berhasil dihapus",
            data: result,
        });
    }
    catch (error) {
        res.status(400).send({
            status: "failed",
            message: error.message,
        });
    }
}

module.exports = {
    saveStock,
    saveReqStock,
    getStocks,
    getReqStocks,
    updateStocks,
    deleteStocks,
    deleteReqStocks,
}
