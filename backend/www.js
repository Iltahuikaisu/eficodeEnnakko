const express = require('express')
const app = express()
console.log(file.__source)
app.use(express.static('./build'))
const PORT = process.env.PORT || 3001

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.send("An error has occured or not.")
}

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))