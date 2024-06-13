const express = require("express")
const app = express()
const cors = require("cors")
require("./connection/connection")
const auth = require("./routes/auth")
const list = require("./routes/list")


app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use(express.json())
app.use("/api/v1", auth)
app.use("/api/v2", list)


app.listen(3000, () => {
    console.log("app running in server 3000")
})