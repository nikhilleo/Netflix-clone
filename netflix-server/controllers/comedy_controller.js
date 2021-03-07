require("dotenv").config();
const download = require('image-downloader')
const cloudinary = require('cloudinary').v2;
var comedy_data = [];
const Axios = require("axios");
const yts = require('yt-search')
const fs = require("fs");
const Comedy = require("../models/comedy"); 


cloudinary.config({
    cloud_name: 'uccrgo5202',
    api_key: '448152779933652',
    api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE'
});


exports.updateComedy = async(req,res)=>{
    try {
    console.log("In Try");
    const pos_deleted = await cloudinary.api.delete_resources_by_prefix("ComedyPosters/")
    console.log(pos_deleted);
    const car_deleted = await cloudinary.api.delete_resources_by_prefix('ComedyCarousal/')
    console.log(car_deleted);
    await Comedy.deleteMany({});
    const comedy = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchComedy}`)
    comedy_data = comedy.data.results;
    for (let i = 0; i < comedy_data.length; i++) {
        if (comedy_data[i].title || comedy_data[i].name) {
            const data = {
                tmdb_id: comedy_data[i].id,
                name: comedy_data[i].title || comedy_data[i].name,
                overview: comedy_data[i].overview,
                date_of_release: comedy_data[i].release_date || comedy_data[i].first_air_date,
                language: comedy_data[i].original_language,
                avg_votes: comedy_data[i].vote_average,
            }
            if (comedy_data[i].title) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + comedy_data[i].poster_path,
                    dest: `./PosterUploads/${comedy_data[i].title}.jpg`,
                }
            } else if (comedy_data[i].name) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + comedy_data[i].poster_path,
                    dest: `./PosterUploads/${comedy_data[i].name}.jpg`,
                }
            }
            download.image(options)
                .then(async ({
                    filename
                }) => {
                    if (filename) { 
                        const img_url = await cloudinary.uploader.upload(filename, {
                            folder: "ComedyPosters/"
                        });
                        data.poster_img = img_url.url
                        var cnt = 1;
                        if (cnt == 1) {
                            const r = await yts(`${data.name} English Dubbed Final Trailer ${data.date_of_release.split("-")[0]}`)
                            const trailer_url = getURL(r.all, data.name)
                            data.trailer_url = trailer_url
                            cnt++;
                        }
                        const comedy = await new Comedy(data);
                        await comedy.save();
                        carousal_downUp(comedy._id, comedy.name, process.env.BACK_IMAGE_URL + comedy_data[i].backdrop_path);
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
    res.send("Updated Comedy");
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
                    folder: "ComedyCarousal/"
                });
                const data = await Comedy.findByIdAndUpdate({
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



exports.getComedy = async(req,res)=>{
    // res.send("Trending Get");
    try {
        const allComedy = await Comedy.find({});
        if(allComedy.length < 1)
        {
            throw new Error("No Comedy Data");
        }
        else {
            res.status(200).send(allComedy);
        }
    } catch (error) {
        if(error.message=="No Comedy Data")
        {
            res.status(404).send(error.message)
        }
    }
}