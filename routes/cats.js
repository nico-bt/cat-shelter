const express = require('express')
const app = express()
const router = express.Router()

// Cat Model
const Cat = require("../models/cat")

// All cats Route (all routes prepended with "cats/")
router.get("/", (req, res)=>{
    res.render("cats/index")
})

// New Cat Route (show form)
router.get("/new", (req, res)=>{
    res.render("cats/new")
})

// Create New Cat Route (add to db)
router.post("/", async (req, res)=>{
    const newCat = new Cat({
        name: req.body.name,
        age: req.body.age,
        vaccinated: !!(req.body.vaccinated),
        neutered: !!(req.body.neutered),
        adopted: !!(req.body.adopted)
    })

    try {
        const newCatAdded = await newCat.save()
        res.render("cats/index", {message: "Added to the list!"})
        // res.redirect(`/cats/${newCatAdded.id}`)
    } catch (error) {
        res.render("cats/new", {message: error})
    }
})


module.exports = router