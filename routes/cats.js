const express = require('express')
const app = express()
const router = express.Router()

// Cat Model
const Cat = require("../models/cat")

// Multer for uploading files
const path = require("path")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("public", "uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const MAX_SIZE_IMAGE = 10*1024*1024 //10MB
const upload = multer({storage: storage, limits: { fileSize: MAX_SIZE_IMAGE }}).single("image")


// ================================================================================
// ROUTES - (all routes are prepended with "cats/")
// ================================================================================

// All cats Route: /cats
router.get("/", async (req, res)=>{
    let searchOptions = {}
    // Option query from search bar
    if(req.query.searchName !== null && req.query.searchName !== ""){
        searchOptions.name = new RegExp(req.query.searchName, "i")
    }
    if(req.query.searchAge !== null && req.query.searchAge !== ""){
        searchOptions.age = new RegExp(req.query.searchAge, "i")
    }
    // Search in DB with options. If no options-->return all cats
    try {
        const cats = await Cat.find(searchOptions)
        res.render("cats/index", {
            cats,
            nameSearch: req.query.searchName,
            ageSearch: req.query.searchAge
         })
    } catch (error) {
        res.render("cats/index", {message: error})
    }
})

// New Cat Route (show form): /cats/new
router.get("/new", (req, res)=>{
    res.render("cats/new")
})

// Create New Cat Route (add to db) -POST
router.post("/", (req, res)=>{
    upload(req, res, (err)=>{
        // Handle error from multer (max file size)
        if(err){
            res.render("cats/new", {message: `${err.message} - Max file size ${MAX_SIZE_IMAGE}`})
        }
        // Admission date and picture are required
        else if(req.body.admissionDate=="" || req.file==undefined){
            res.render("cats/new", {message:"Picture and Admission date are required"})
        }
        else{
            // Create item
            const newCat = new Cat({
            image: (req.file? req.file.filename : "") , //req.file comes from 'multer' with the 'upload' midleware. "image" is the name of the input type=file in the form
            name: req.body.name,
            age: req.body.age,
            admissionDate: req.body.admissionDate,
            vaccinated: !!(req.body.vaccinated), // "!!" for make it boolean
            neutered: !!(req.body.neutered),
            adopted: !!(req.body.adopted)
            })
            //Add item to database and render 
            newCat.save()
            .then(()=>Cat.find())
            .then(cats=> res.render("cats/index", {message: `Added to the list!`, cats}))
            .catch(error => res.render("cats/new", {message: error}) )
        }
    })
})

// Single cat Route - /cat/id
router.get("/:id", async (req,res)=>{
	try {
		const cat = await Cat.findById(req.params.id).exec();
		res.render("cats/cat",{cat})
	} catch (error) {
		res.send(error)
	}
})


module.exports = router