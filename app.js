const express = require("express");
const cors = require("cors");
const contactRouter  =require("./app/routes/contact_route")
const apiError = require("./app/apiError")

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application!" });
});
app.use("/api/contacts", contactRouter);

//handle 404
app.use((req, res, next) =>{
    return next(new apiError(404, "Resource not found"));
});

//define error-handling middleware last
appp.use((err, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internet Server Error",
    });
})

module.exports = app;