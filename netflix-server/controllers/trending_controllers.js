

const Trending = require("../models/trending"); 

exports.getTrending = async(req,res)=>{
    // res.send("Trending Get");
    try {
        const allTrending = await Trending.find({});
        if(allTrending.length < 1)
        {
            throw new Error("No Trending Data");
        }
        else {
            res.status(200).send(allTrending);
        }
    } catch (error) {
        if(error.message=="No Trending Data")
        {
            res.status(404).send(error.message)
        }
    }
}