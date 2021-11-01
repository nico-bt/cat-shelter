const express = require('express')
const app = express()

const router = express.Router()

// All cats Route
router.get("/", (req, res)=>{
    res.render("cats/index")
})

// New Cat Route (show form)
router.get("/new", (req, res)=>{
    res.render("cats/new")
})

// Create New Cat Route (add to db)
router.post("/", (req, res)=>{
    res.send("POST cats/new")
})


module.exports = router