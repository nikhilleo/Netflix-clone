
require("dotenv").config();
const download = require('image-downloader')
const cloudinary = require('cloudinary').v2;
var TopRatedData = [];
const Axios = require("axios");
const yts = require('yt-search')
const fs = require("fs");
const TopRated = require("../models/topRated")


cloudinary.config({
    cloud_name: 'uccrgo5202',
    api_key: '448152779933652',
    api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE'
});


exports.updateTopRated = async(req,res)=>{
    try {
    console.log("In Try");
    const pos_deleted = await cloudinary.api.delete_resources_by_prefix("TopRatedPosters/")
    console.log(pos_deleted);
    const car_deleted = await cloudinary.api.delete_resources_by_prefix('TopRatedCarousal/')
    console.log(car_deleted);
    await TopRated.deleteMany({});
    const topRated = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchTopRated}`)
    TopRatedData = topRated.data.results;
    for (let i = 0; i < TopRatedData.length; i++) {
        if (TopRatedData[i].title || TopRatedData[i].name) {
            const data = {
                tmdb_id: TopRatedData[i].id,
                name: TopRatedData[i].title || TopRatedData[i].name,
                overview: TopRatedData[i].overview,
                date_of_release: TopRatedData[i].release_date || TopRatedData[i].first_air_date,
                language: TopRatedData[i].original_language,
                avg_votes: TopRatedData[i].vote_average,
            }
            if (TopRatedData[i].title) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + TopRatedData[i].poster_path,
                    dest: `./PosterUploads/${TopRatedData[i].title}.jpg`,
                }
            } else if (TopRatedData[i].name) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + TopRatedData[i].poster_path,
                    dest: `./PosterUploads/${TopRatedData[i].name}.jpg`,
                }
            }
            download.image(options)
                .then(async ({
                    filename
                }) => {
                    if (filename) { 
                        const img_url = await cloudinary.uploader.upload(filename, {
                            folder: "TopRatedPosters/"
                        });
                        data.poster_img = img_url.url
                        var cnt = 1;
                        if (cnt == 1) {
                            const r = await yts(`${data.name} English Dubbed Final Trailer ${data.date_of_release.split("-")[0]}`)
                            const trailer_url = getURL(r.all, data.name)
                            data.trailer_url = trailer_url
                            cnt++;
                        }
                        const topRatedNew = await new TopRated(data);
                        await topRatedNew.save();
                        carousal_downUp(topRatedNew._id, topRatedNew.name, process.env.BACK_IMAGE_URL + TopRatedData[i].backdrop_path);
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
    res.send("Updated TopRated");
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
                    folder: "TopRatedCarousal/"
                });
                const data = await TopRated.findByIdAndUpdate({
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
        for (let i = 0; i < data.length; i++) {
            if (title.includes(":")) {
                title.replace(":", "");
            }
            if (title.includes(`${name}`) && title.includes("official") && data[i].seconds < 300) {
                goodLinks.push(data[i].url);
            }
        }
    }
    return goodLinks;
}



exports.getTopRated = async(req,res)=>{
    // res.send("Trending Get");
    try {
        const allTopRated = await TopRated.find({});
        if(allTopRated.length < 1)
        {
            throw new Error("No Top Rated Data");
        }
        else {
            res.status(200).send(allTopRated);
        }
    } catch (error) {
        if(error.message=="No Top Rated Data")
        {
            res.status(404).send(error.message)
        }
    }
}