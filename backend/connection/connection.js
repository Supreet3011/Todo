const mongoose = require("mongoose")

const conn = async(req, res) => {
    try {
        await mongoose.connect("mongodb+srv://user:password@cluster0.drosmrv.mongodb.net/")
        .then(() => {
            console.log("Connected")
        })
    } catch (error) {
        res.status(400).send({msg: "NOT CONNECTED"})
    }
}
conn()
