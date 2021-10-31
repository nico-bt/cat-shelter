// =============================================================
// Importing and config Express
// =============================================================

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3000

app.set("views", __dirname + "/views")
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set("layout", "layouts/layout")
app.use(express.static("public"))

// Routes
const indexRouter = require("./routes/index")


// =============================================================
// App
// =============================================================

app.use("/", indexRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})