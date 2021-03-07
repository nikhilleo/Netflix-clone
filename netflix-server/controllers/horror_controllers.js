
require("dotenv").config();
const download = require('image-downloader')
const cloudinary = require('cloudinary').v2;
var horror_data = [];
const Axios = require("axios");
const yts = require('yt-search')
const fs = require("fs");
const Horror = require("../models/horror"); 


cloudinary.config({
    cloud_name: 'uccrgo5202',
    api_key: '448152779933652',
    api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE'
});


exports.updateHorror = async(req,res)=>{
    try {
    console.log("In Try");
    const pos_deleted = await cloudinary.api.delete_resources_by_prefix("HorrorPosters/")
    console.log(pos_deleted);
    const car_deleted = await cloudinary.api.delete_resources_by_prefix('HorrorCarousal/')
    console.log(car_deleted);
    await Horror.deleteMany({});
    const comedy = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchHorror}`)
    horror_data = comedy.data.results;
    for (let i = 0; i < horror_data.length; i++) {
        if (horror_data[i].title || horror_data[i].name) {
            const data = {
                tmdb_id: horror_data[i].id,
                name: horror_data[i].title || horror_data[i].name,
                overview: horror_data[i].overview,
                date_of_release: horror_data[i].release_date || horror_data[i].first_air_date,
                language: horror_data[i].original_language,
                avg_votes: horror_data[i].vote_average,
            }
            if (horror_data[i].title) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + horror_data[i].poster_path,
                    dest: `./PosterUploads/${horror_data[i].title}.jpg`,
                }
            } else if (horror_data[i].name) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + horror_data[i].poster_path,
                    dest: `./PosterUploads/${horror_data[i].name}.jpg`,
                }
            }
            download.image(options)
                .then(async ({
                    filename
                }) => {
                    if (filename) { 
                        const img_url = await cloudinary.uploader.upload(filename, {
                            folder: "HorrorPosters/"
                        });
                        data.poster_img = img_url.url
                        var cnt = 1;
                        if (cnt == 1) {
                            const r = await yts(`${data.name} English Dubbed Final Trailer ${data.date_of_release.split("-")[0]}`)
                            const trailer_url = getURL(r.all, data.name)
                            data.trailer_url = trailer_url
                            cnt++;
                        }
                        const horror = await new Horror(data);
                        await horror.save();
                        carousal_downUp(horror._id, horror.name, process.env.BACK_IMAGE_URL + horror_data[i].backdrop_path);
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
    res.send("Updated Horror");
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
                    folder: "HorrorCarousal/"
                });
                const data = await Horror.findByIdAndUpdate({
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



exports.getHorror = async(req,res)=>{
    // res.send("Trending Get");
    try {
        const allHorror = await Horror.find({});
        if(allHorror.length < 1)
        {
            throw new Error("No Horror Data");
        }
        else {
            res.status(200).send(allHorror);
        }
    } catch (error) {
        if(error.message=="No Horror Data")
        {
            res.status(404).send(error.message)
        }
    }
}

