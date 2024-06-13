const {Router} = require("express")
const User = require("../models/user")
const List = require("../models/list")

const router = Router()


//Add

router.post("/Addtask", async(req, res) => {
    try {
        const { title, body, id} = req.body
        const existingUser = await User.findById(id)
        if(existingUser) {
            const list = new List({title, body, user: existingUser})
            await list.save().then(() => {
                return res.status(200).send({list})
            })
            existingUser.list.push(list)
            existingUser.save()
    }
    } catch (error) {
        console.log(error)
    }
})

//Update

router.put("/Updatetask/:id", async(req, res) => {
    try {
            const {title, body} = req.body
            const list = await List.findByIdAndUpdate(req.params.id, {title, body})
            list.save().then(() => res.status(200).send({msg: "Task updated successfully"})
            )
    } catch (error) {
        console.log(error)
    }
})

//Delete

router.delete("/Deletetask/:id", async(req, res) => {
    try {
        const {id} = req.body
        const existingUser = await User.findByIdAndUpdate(id, {$pull: {list: req.params.id}})
        if(existingUser) {
            await List.findByIdAndDelete(req.params.id).then(() => res.status(200).send({msg: "Task deleted successfully"}))
    }
    } catch (error) {
        console.log(error)
    }

})

//Get tasks

router.get("/Gettasks/:id", async(req, res) => {
    const list = await List.find({user: req.params.id}).sort({createdAt: -1})
    if(list.length === 0) res.status(200).send({msg: "No tasks were created"})
    res.status(200).send({list})
})


module.exports = router