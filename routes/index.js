const express = require('express')
const app = express()

const router = express.Router()

router.get("/", (req, res)=>{
    res.send("Hello from the /routes/index.js")
})

module.exports = router