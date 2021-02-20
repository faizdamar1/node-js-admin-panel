'use strict'

const Example = require('../models/example.model')

exports.index = function (req, res) {
    Example.findAll(function (err, example) {
        if (err) {
            res.status(500).send({
                error: true,
                message: err
            })
        } else {
            res.status(200).send({
                error: false,
                message: "get all data successfully",
                data: example
            })

        }
    })
}

exports.create = function (req, res) {

    const newExample = new Example(req.body)
    //handle null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Pleas provide all require field"
        })
    } else {
        Example.create(newExample, function (err, example) {
            if (err) res.send(err)
            res.send({
                error: false,
                message: "Data added successfully",
                data: example
            })
        })
    }
}

exports.findById = function (req, res) {
    Example.findById(req.params.id, function (err, example) {
        if (err) {
            res.status(500).send({
                error: true,
                message: err
            })
        } else {
            res.status(200).send({
                error: false,
                message: "get data by id successfully",
                data: example
            })
        }
    })
}

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please provide all require field"
        })
    } else {
        const newExample = new Example(req.body)

        Example.update(req.params.id, newExample, function (err, example) {
            if (err) {
                res.status(500).send({
                    error: true,
                    message: err
                })
            } else {
                res.status(200).send({
                    error: false,
                    message: "data updated successfully",
                    data: example
                })
            }
        })
    }
}

exports.delete = function (req, res) {
    console.log(req.params.id)
    Example.delete(req.params.id, function (err, example) {
        if (err) {
            res.status(500).send({
                error: true,
                message: err
            })
        } else {
            res.status(200).send({
                error: false,
                message: "data deleted successfully",
                data: example
            })
        }
    })
}