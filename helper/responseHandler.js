const successHandler = (res, message, result) => {
    res.status(200).json({ message, result })
}

const errorHandler = (res, message, error) => {
    res.status(500).json({ message, error })
}

// second method 

const errorSecondMethod = (req, res) => {
    if (typeof (err) === 'string') {
        return res.status(400).json({ message: err })
    }
    if (err.name === 'validationError') {
        return res.status(400).json({ message: err.message });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    return res.status(500).json({ message: err.message })
}






module.exports = { successHandler, errorHandler }

