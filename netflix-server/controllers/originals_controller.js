
require("dotenv").config();
const download = require('image-downloader')
const cloudinary = require('cloudinary').v2;
var netflix_originals = [];
const Axios = require("axios");
const yts = require('yt-search')
const fs = require("fs");
const Originals = require("../models/netflixOriginals"); 


cloudinary.config({
    cloud_name: 'uccrgo5202',
    api_key: '448152779933652',
    api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE'
});


exports.updateOriginals = async(req,res)=>{
    try {
    console.log("In Try");
    const pos_deleted = await cloudinary.api.delete_resources_by_prefix("NetflixOriginalsPosters/")
    console.log(pos_deleted);
    const car_deleted = await cloudinary.api.delete_resources_by_prefix('NetflixOriginalsCarousal/')
    console.log(car_deleted);
    await Originals.deleteMany({});
    const originals = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchNetflixOriginals}`)
    netflix_originals = originals.data.results;
    // console.log(netflix_originals);
    for (let i = 0; i < netflix_originals.length; i++) {
        if (netflix_originals[i].title || netflix_originals[i].name) {
            // console.log(netflix_originals[i].overview);
            // console.log(netflix_originals[i].release_date || netflix_originals[i].first_air_date);
            const data = {
                tmdb_id: netflix_originals[i].id,
                name: netflix_originals[i].title || netflix_originals[i].name,
                title: netflix_originals[i].original_name,
                overview: netflix_originals[i].overview,
                date_of_release: netflix_originals[i].release_date || netflix_originals[i].first_air_date,
                language: netflix_originals[i].original_language,
                avg_votes: netflix_originals[i].vote_average,
            }
            if(!netflix_originals[i].first_air_date)
            {
                data.date_of_release = "Comimg Soon"
            }
            if (netflix_originals[i].title) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + netflix_originals[i].poster_path,
                    dest: `./PosterUploads/${netflix_originals[i].title}.jpg`,
                }
            } else if (netflix_originals[i].name) {
                var options = {
                    url: process.env.BACK_IMAGE_URL + netflix_originals[i].poster_path,
                    dest: `./PosterUploads/${netflix_originals[i].name}.jpg`,
                }
            }
            download.image(options)
                .then(async ({
                    filename
                }) => {
                    if (filename) { 
                        const img_url = await cloudinary.uploader.upload(filename, {
                            folder: "NetflixOriginalsPosters/"
                        });
                        data.poster_img = img_url.url
                        var cnt = 1;
                        if (cnt == 1) {
                            const r = await yts(`${data.name} Netflix English Trailer ${data.date_of_release.split("-")[0]}`)
                            const trailer_url1 = getURL(r.all, data.name,data.title)
                            // console.log("\n\n\n\n\n")
                            // console.log(trailer_url1).
                            console.log(trailer_url1)
                            data.trailer_url = trailer_url1;
                            // data.trailer_url = trailer_url1
                            cnt++;
                        }
                        const originals = await new Originals(data);
                        await originals.save();
                        carousal_downUp(originals._id, originals.name, process.env.BACK_IMAGE_URL + netflix_originals[i].backdrop_path);
                        fs.unlink(filename, (err) => {
                            if (err) 
                            console.log(err)
                            else
                            console.log(`Deleted file: ${filename}`); 
                        });
                    }
                })
                .catch((err) => console.log(err))
        }
    }
    res.send("Updated Originals");
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
                    folder: "NetflixOriginalsCarousal/"
                });
                const data = await Originals.findByIdAndUpdate({
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


function getURL(data, name1,title1) {
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
    // console.log(goodLinks)
    if (goodLinks.length <= 1) {
        yts(`${title1} English Dubbed Final Trailer`).then((res)=>{
            res.all.length = 10;
            var data1 = res.all;
            const data = newdata(data1.length=5,title1);
            data.length = 10;
            goodLinks = data
        }).catch((err)=>{
            console.log(err)
        })
    }
    return goodLinks;
}

function newdata(data,title1)
{
    var goodLinks = []
    for (let i = 0; i < data.length; i++) {
        console.log(data);
        // console.log(data[i].url)
        goodLinks.push(data[i].url);
    }
    // console.log(goodLinks);
    return goodLinks;
}


exports.getOriginals = async(req,res)=>{
    // res.send("Trending Get");
    try {
        const allOriginals = await Originals.find({});
        if(allOriginals.length < 1)
        {
            throw new Error("No Originals Data");
        }
        else {
            res.status(200).send(allOriginals);
        }
    } catch (error) {
        if(error.message=="No Originals Data")
        {
            res.status(404).send(error.message)
        }
    }
}