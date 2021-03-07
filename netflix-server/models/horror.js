



const mongoose = require('mongoose');

const horrorSchema = mongoose.Schema({
    tmdb_id:{
        type:String,
        // unique:true,
        required:[true,"ID Is Required"]
    },
    name:{
        type:String,
        // unique:true,
        required:true
    },
    overview:{
        type:String,
        // unique:true,
        required:true
    },
    date_of_release:{
        type:String,
        // unique:true,
        required:true
    },
    language:{
        type:String,
        // unique:true,
        required:true
    },
    avg_votes:{
        type:String,
        // unique:true,
        required:true
    },
    carousal_img:{
        type:String,
        // unique:true,
        // required:true
    },
    poster_img:{
        type:String,
        // unique:true,
        // required:true
    },
    trailer_url:{
        type:Array,
        default:[],
        required:true
    }
},{timestamps:true});


const Horror = mongoose.model("Horror",horrorSchema);
module.exports = Horror;