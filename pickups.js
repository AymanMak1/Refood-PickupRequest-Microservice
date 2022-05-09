const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios"); 


app.use(bodyParser.json());

require("./Pickup");
const Pickup = mongoose.model("Pickup")

mongoose.connect("mongodb+srv://refoodmicro:3OJngdTDn8THkjd2@refoodcluster.exdgz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",() => {
    console.log("Database is connected");
}); 

app.get('/',(req,res)=>{
    res.send("Pickup Service");
})

app.post('/pickup',(req,res)=>{
    var newPickup ={
        providerName: req.body.providerName,
        pickupTime:req.body.pickupTime,
        portions:req.body.portions
    }
    
    var pickup=new Pickup(newPickup)

    pickup.save().then(()=>{
        res.send("New Pickup Created")
    })
})

app.get("/pickups",(req,res)=>{
    Pickup.find().then((pickups)=>{
        res.json(pickups)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
})

app.get("/pickup/:id",(req,res)=>{
    Pickup.findById(req.params.id).then((pickup)=>{
        if(pickup){
            res.json(pickup);
            /*axios.get("http://localhost:4545/users/"+ pickup.providerId).then((res)=>{
                var pickupObject = {
                    providerName: res.data.name
                }
                res.json(pickupObject);
            })
            res.send()*/
        } else{
            res.sendStatus(404)
        }
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
})

app.delete("/pickup/:id",(req,res)=>{
    Pickup.findOneAndRemove(req.params.id).then((pickup)=>{
        res.send("Pickup has been removed")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
})


app.listen(4545,()=>{ 
    console.log("Pickups Service : Server is up and running!");
})