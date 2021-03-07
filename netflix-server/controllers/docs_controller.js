
require("dotenv").config();
const download = require('image-downloader')
const cloudinary = require('cloudinary').v2;
var docs_data = [];
const Axios = require("axios");
const yts = require('yt-search')
const fs = require("fs");
const Docs = require("../models/docs"); 


cloudinary.config({
    cloud_name: 'uccrgo5202',
    api_key: '448152779933652',
    api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE'
});


exports.updateDocs = async(req,res)=>{
    try {
    console.log("In Try");
    const pos_deleted = await cloudinary.api.delete_resources_by_prefix("DocsPosters/")
    console.log(pos_deleted);
    const car_deleted = await cloudinary.api.delete_resources_by_prefix('DocsCarousal/')
    console.log(car_deleted);
    await Docs.deleteMany({});
    const docs = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchDocs}`)
    docs_data = docs.data.results;
    for (let i = 0; i < docs_data.length; i++) {
        if (docs_data[i].title || docs_data[i].name) {
            const data = {
                tmdb_id: docs_data[i].id,
                name: docs_data[i].title || docs_data[i].name,
                overview: docs_data[i].overview,
                date_of_release: docs_data[i].release_date || docs_data[i].first_air_date,
                language: docs_data[i].original_language,
                avg_votes: docs_data[i].vote_average,
            }
            if (docs_data[i].title) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + docs_data[i].poster_path,
                    dest: `./PosterUploads/${docs_data[i].title}.jpg`,
                }
            } else if (docs_data[i].name) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + docs_data[i].poster_path,
                    dest: `./PosterUploads/${docs_data[i].name}.jpg`,
                }
            }
            download.image(options)
                .then(async ({
                    filename
                }) => {
                    if (filename) { 
                        const img_url = await cloudinary.uploader.upload(filename, {
                            folder: "DocsPosters/"
                        });
                        data.poster_img = img_url.url
                        var cnt = 1;
                        if (cnt == 1) {
                            const r = await yts(`${data.name} English Dubbed Final Trailer ${data.date_of_release.split("-")[0]}`)
                            const trailer_url = getURL(r.all, data.name)
                            data.trailer_url = trailer_url
                            cnt++;
                        }
                        const docs = await new Docs(data);
                        await docs.save();
                        carousal_downUp(docs._id, docs.name, process.env.BACK_IMAGE_URL + docs_data[i].backdrop_path);
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
    res.send("Updated Docs");
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
                    folder: "DocsCarousal/"
                });
                const data = await Docs.findByIdAndUpdate({
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



exports.getDocs = async(req,res)=>{
    // res.send("Trending Get");
    try {
        const allDocs = await Docs.find({});
        if(allDocs.length < 1)
        {
            throw new Error("No Docs Data");
        }
        else {
            res.status(200).send(allDocs);
        }
    } catch (error) {
        if(error.message=="No Docs Data")
        {
            res.status(404).send(error.message)
        }
    }
}

