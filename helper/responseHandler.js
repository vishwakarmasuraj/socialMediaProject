const successHandler = (res, message, result) => {
    res.status(200).json({ message, result })
}

const errorHandler = (res, message, error) => {
    res.status(500).json({ message, error })
}

module.exports = { successHandler, errorHandler }