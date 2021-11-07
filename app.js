//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");

const app = express();

app.set('view engine', 'ejs');
const posts=[];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database:'car_rental',
  port:3307
});
connection.connect((error)=>{
  if(error){
    console.log(error)

  }else{
    console.log('Database connected')
  }
});

app.get("/",function(req,res){
  res.render("home");

});
app.get("/about",function(req,res){
  res.render("about");
});
app.get("/contact",function(req,res){
  res.render("contact");
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.get("/booking",function(req,res){
  res.render("booking");
});
app.post("/compose",function(req,res){
  const {name,age,street,city,days,date,car_number}=req.body;
  connection.query('INSERT INTO customer SET ?',{name: name, age:age, street: street, city:city, car_regno:car_number },function(error,results){
  if(error){
    console.log(error);
  }else{
    console.log("check ur db");
  }
  });
  connection.query('INSERT INTO booking SET ?',{booking_date: date,no_of_days:days,car_regno: car_number,customer_name:name},function(error,results){
    if(error){
      console.log(error);
    }
  });

  connection.query('SELECT * FROM booking WHERE car_regno = ?',[car_number],function(error,rows,fields){
    if(error){
      console.log(error);
    }else{
      res.render("booking", {heading: 'Booking', things: rows})
    }
  })



});


// res.render("booking");










app.listen(3001, function() {
  console.log("Server started on port 3001");
});
