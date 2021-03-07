
require("dotenv").config();
const download = require('image-downloader')
const cloudinary = require('cloudinary').v2;
var romanc_data = [];
const Axios = require("axios");
const yts = require('yt-search')
const fs = require("fs");
const Romance = require("../models/romance"); 


cloudinary.config({
    cloud_name: 'uccrgo5202',
    api_key: '448152779933652',
    api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE'
});


exports.updateRomance = async(req,res)=>{
    try {
    console.log("In Try");
    const pos_deleted = await cloudinary.api.delete_resources_by_prefix("RomancePosters/")
    console.log(pos_deleted);
    const car_deleted = await cloudinary.api.delete_resources_by_prefix('RomanceCarousal/')
    console.log(car_deleted);
    await Romance.deleteMany({});
    const comedy = await Axios.get(`${process.env.fetchRomance}`)
    romanc_data = comedy.data.results;
    for (let i = 0; i < romanc_data.length; i++) {
        if (romanc_data[i].title || romanc_data[i].name) {
            const data = {
                tmdb_id: romanc_data[i].id,
                name: romanc_data[i].title || romanc_data[i].name,
                overview: romanc_data[i].overview,
                date_of_release: romanc_data[i].release_date || romanc_data[i].first_air_date,
                language: romanc_data[i].original_language,
                avg_votes: romanc_data[i].vote_average,
            }
            if (romanc_data[i].title) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + romanc_data[i].poster_path,
                    dest: `./PosterUploads/${romanc_data[i].title}.jpg`,
                }
            } else if (romanc_data[i].name) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + romanc_data[i].poster_path,
                    dest: `./PosterUploads/${romanc_data[i].name}.jpg`,
                }
            }
            download.image(options)
                .then(async ({
                    filename
                }) => {
                    if (filename) { 
                        const img_url = await cloudinary.uploader.upload(filename, {
                            folder: "RomancePosters/"
                        });
                        data.poster_img = img_url.url
                        var cnt = 1;
                        if (cnt == 1) {
                            const r = await yts(`${data.name} English Dubbed Final Trailer ${data.date_of_release.split("-")[0]}`)
                            const trailer_url = getURL(r.all, data.name)
                            data.trailer_url = trailer_url
                            cnt++;
                        }
                        const romance = await new Romance(data);
                        await romance.save();
                        carousal_downUp(romance._id, romance.name, process.env.BACK_IMAGE_URL + romanc_data[i].backdrop_path);
                        fs.unlink(filename, (err) => {
                            if (err) console.log(err)
                            else
                            console.log(`Deleted file: ${filename}`); 
                        });
                    }
                })
                .catch((err) => console.log(err))
        }
    }
    res.send("Updated Romance");
    } catch (error) {
        console.log(error);
        res.send(error.message)
        
    }
}


function carousal_downUp(id, name, url) {
    const options = {
        url: url,
        dest: `./CarousalUploads/${name}.jpg`,
    }
    download.image(options)
        .then(async ({
            filename
        }) => {
            if (filename) {
                const img_url = await cloudinary.uploader.upload(filename, {
                    folder: "RomanceCarousal/"
                });
                const data = await Romance.findByIdAndUpdate({
                    _id: id
                }, {
                    carousal_img: img_url.url
                });
                fs.unlink(filename, (err) => {
                    if (err) console.log(err)
                    else
                    console.log(`Deleted file: ${filename}`); 
                });
            }

        })
}


function getURL(data, name1) {
    var flag = 0;
    var goodLinks = []
    const name = name1.toLowerCase()
    for (let i = 0; i < data.length; i++) {
        var title = data[i].title.toLowerCase();
        if (title.includes(":")) {
            title.replace(":", "");
        }
        if (title.includes(`${name}`) && title.includes("official") && data[i].seconds < 180) {
            goodLinks.push(data[i].url);
        }
    }
    if (goodLinks.length < 1) {
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            if(data[i].seconds < 240)
            goodLinks.push(data[i].url)
        }
    }
    return goodLinks;
}



exports.getRomance = async(req,res)=>{
    // res.send("Trending Get");
    try {
        const allRomance = await Romance.find({});
        if(allRomance.length < 1)
        {
            throw new Error("No Romance Data");
        }
        else {
            res.status(200).send(allRomance);
        }
    } catch (error) {
        if(error.message=="No Romance Data")
        {
            res.status(404).send(error.message)
        }
    }
}

