// =============================================================
// Importing Express and general config
// =============================================================
// Express
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3000

app.set("views", __dirname + "/views")
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set("layout", "layouts/layout")
app.use(express.static("public"))

// Enable access to body.xxxx
app.use(express.json()); 
app.use(express.urlencoded())

// Database
let config;
try{
	config = require("./config");
} catch(e){
	console.log("Could not import 'config.js'. Maybe NOT working locally?");
	console.log(e);
}
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL || config.connection)
const db = mongoose.connection
db.on("error", error => console.log(error))
db.once("open", () => console.log("Connected to MongoDB"))

// Routes
const indexRouter = require("./routes/index")
const catsRouter = require("./routes/cats")


// =============================================================
// App
// =============================================================

app.use("/", indexRouter)
app.use("/cats", catsRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})