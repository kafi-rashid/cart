const Product = require("../models/product.model");

const getAll = function(req, res) {
    res.status(200).json(Product.getAll());
}

const getById = function(req, res) {
    let productId = req.params.productId;
    let product = Product.getById(productId);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({
            message: "No product found with ID " + productId
        });
    }
}

const deleteById = function(req, res) {
    let productId = req.params.productId;
    let isDeleted = Product.deleteById(productId);
    if (isDeleted) {
        res.status(200).json({
            message: "Product has been deleted!"
        });
    } else {
        res.status(404).json({
            message: "Product with ID " + productId + " can not be deleted!"
        });
    }
}

module.exports = {
    getAll,
    getById,
    deleteById
}