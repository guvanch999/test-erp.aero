module.exports = (req, res) => {

    res.status(404).json({
        status: 404,
        message: "Cannot find endpoint"
    })

};