const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function (req,res) {

  var today = new Date();

var options = {
  weekday :"long",
  day : "numeric",
  month : "long"
}

let day = today.toLocaleDateString("en-US",options);
  // var currentDAy = today.getDay();
  // var day = "";

  // if (currentDAy === 6  || currentDAy === 0 ) {
  //   day = "weekend";
  //     res.sendfILE(__dirname + "/weekend.html");
  // }else{
  //   day = "weekday"
  //   res.sendFile(__dirname + "/weekday.html");
  // }

  // if (currentDAy === 6  || currentDAy === 0 ) {
  //   day = "weekend";
  // }else{
  //   day = "weekday";
  // }

// switch (currentDAy) {
//   case 0:
//   day = "Sunday" ;
//     break;
//   case 1:
//   day = "Monday" ;
//     break;
//   case 2:
//   day = "tueday" ;
//     break;
//   case 3:
//   day = "Wednesday" ;
//     break;
//   case 4:
//   day = "Thrusday" ;
//     break;
//   case 5:
//   day = "Friday" ;
//     break;
//   case 6:
//   day = "Saturday" ;
//     break;
//   default:
//   console.log("Error: current day is equal to:" + currentDAy);
// }


  res.render("list", {listTitle : day, newListItems:items});

});

app.post("/",function (req,res) {

  let item =req.body.newItem ;
  
  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function (req,res) {
  res.render("list",{listTitle:"Work List",newListItems:workItems});
});

app.post("/work", function (req,res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


app.listen(3000,function () {
  console.log("server started on port 3000");
});
