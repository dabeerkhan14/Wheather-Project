const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");    
});

app.post("/",function(req,res){

    const appid="b8789f5073342c8ec0bba1a945278ae5";
    const units="metric";
    const query=req.body.cityname;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
           const weatherData=JSON.parse(data);
           const temp=weatherData.main.temp;
           const weatherDiscription=weatherData.weather[0].description;
           const icon=weatherData.weather[0].icon;
           const imageUrl="https://openweathermap.org/img/wn/" + icon + "@2x.png"
           
           res.write("<p>The weather discription is "+weatherDiscription+"</p>");
           res.write("<h1>The Temperature in "+query+" is "+temp+" degrees celcius</h1>");
           res.write("<img src="+imageUrl+">");
           res.send();



        });
    });

})







app.listen(3000,function(){
    console.log("Server has started running on port 3000");
})








