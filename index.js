const http = require('http')
const app = require("./app")
const connectDB = require("./postgresql")
const PORT = process.env.PORT || 8080
const server = http.createServer(app)

server.listen(PORT, async () => {
    console.log(`Started org on port ${PORT}`)
    await connectDB()
})