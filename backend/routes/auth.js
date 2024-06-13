const {Router} = require("express")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const router = Router()

// Sign Up
router.post("/register", async(req, res) => {
    try {
        const {email, username, password} = req.body
        const hashPassword = bcrypt.hashSync(password, 10)
        const user = new User({email, username, password: hashPassword})
        await user.save()
        res.status(200).send({msg: "Sign up Successful"})
    } catch (error) {
        console.error(error)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

// Sign In
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(400).send({msg: "User doesn't exist, Sign up first"})
        
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isPasswordCorrect) return res.status(400).send({msg: "Password is Incorrect"})
        
        const {password, ...others} = user._doc
        return res.status(200).send(others)
    } catch (error) {
        console.error(error)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

module.exports = router
