const express = require("express");
const app = express();
app.use(express.static("public"));
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/grocery", () => {
    console.log("DataBase Connected");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "\\index.html");
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    subject: String,
    message: String,
});

const newsLetterSchema = new mongoose.Schema({
    email: String,
});

const newsLetterModel = new mongoose.model("Newsletter", newsLetterSchema);

const contactModel = new mongoose.model("Contact", contactSchema);

app.post("/", (req, res) => {
    console.log(req.body);
    var comment1 = new contactModel({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        subject: req.body.subject,
        message: req.body.message,
    });
    const save = async() => {
        result = await comment1.save();
        console.log(result);
    };

    save();
    res.redirect("/");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "\\login.html");
});
app.post("/sub", (req, res) => {
    var comment2 = new newsLetterModel({
        email: req.body.email,
    });

    const save = async() => {
        result = await comment2.save();
        console.log(result);
    };

    save();
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("port started at http://localhost:3000");
});