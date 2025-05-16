const path = require("path");
require("dotenv").config({
   path: path.resolve(__dirname, ".env"),
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express"); 
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "templates"))
app.use(bodyParser.urlencoded({extended:false}));

process.stdin.setEncoding("utf8");
//const databaseName = "Students";
//const collectionName = "studentsCollection";
//const uri = process.env.MONGO_CONNECTION_STRING;

app.get("/", (request, response)=>{
    response.render("login.ejs", {});
})

app.post("/processLogin", (request, response)=>{
    let {user, password} = request.body;
    response.render("home.ejs", {user: user});

})

app.get("/register", (request, response)=>{
    response.render("register.ejs", {});
})

app.post("/processRegister", (request, response)=>{
    let {user, password} = request.body;
    response.redirect("/")

})

const portNumber = 8080;
app.listen(portNumber);
console.log(`Web Server started and running at http://localhost:${portNumber}`);

const prompt = 'Type stop to shutdown the server: ';
process.stdout.write(prompt);
process.stdin.on('readable', function (){
    const data = process.stdin.read();
    if(data !== null){
        const command = data.trim();
        if(command === 'stop'){
            process.stdout.write('Shutting down the server');
            process.exit(0);
        }else{
            process.stdout.write(`Invalid Command: ${command}\n`);
        }
    }
    process.stdout.write(prompt);
    process.stdin.resume();
})