const express = require('express')
const app = express()
const router = express.Router()

// Cat Model
const Cat = require("../models/cat")

// (all routes are prepended with "cats/")
// All cats Route 
router.get("/", async (req, res)=>{
    try {
        const cats = await Cat.find()
        res.render("cats/index", {cats})
    } catch (error) {
        res.render("cats/index", {message: error})
    }

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