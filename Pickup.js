const mongoose = require("mongoose");

mongoose.model("Pickup",{

    providerName:{
        type:String,
        require:true
    }, 
    pickupTime:{
        type:Date,
        require:true
    },
	portions:{
        type:Number,
        require:false
    }
	
})