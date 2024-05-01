const express = require("express");
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
var query ="";

var idd=["https://images.unsplash.com/photo-1610450949065-1f2841536c88?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1599599811214-3d44be99547f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHwyfHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1493925410384-84f842e616fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHwzfHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1582176604856-e824b4736522?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHw0fHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1599599810769-bcde5a160d32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHw1fHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1606312619070-d48b4c652a52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHw2fHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1623660053975-cf75a8be0908?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHw3fHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1481391319762-47dff72954d9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHw4fHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1575377427642-087cf684f29d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHw5fHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1575377427642-087cf684f29d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHw5fHxjaG9jb2xhdGV8ZW58MHx8fHwxNzA4OTY1NzY5fDA&ixlib=rb-4.0.3&q=85","https://images.unsplash.com/photo-1587271644048-2fbb187de8d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg2NzZ8MHwxfHNlYXJjaHwxMHx8Y2hvY29sYXRlfGVufDB8fHx8MTcwODk2NTc2OXww&ixlib=rb-4.0.3&q=80&w=1080"];
app.get("/",(req,res)=>{
    res.render("main",{iddd:idd});
})
app.get("/about",(req,res)=>{
  res.render("about");
})
app.post("/", (req, res) => {
  const query = req.body.querys;
  const pic = [];
  const url = "https://api.unsplash.com/search/photos/?query=" + query + "&client_id=ApP3teRJw45yZj8oZAzJkia9GBkWns0zof35CM8I0Ss";
  +-
  https.get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });
  
    response.on("end", () => {
      try {
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        for (let i = 0; i < 9; i++) {
          pic.push(jsonData.results[i].urls.full);
        }
        res.render("main", { iddd: pic });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  });
  
});


app.listen(3000, () => {
  console.log("Port started at 3000");
});
