const download = require('image-downloader')
const cloudinary = require('cloudinary').v2;
var trendingdata = [];
const Axios = require("axios");
const yts = require('yt-search')
const fs = require("fs");
const Trending = require("../models/trending");



cloudinary.config({
    cloud_name: 'uccrgo5202',
    api_key: '448152779933652',
    api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE'
});



exports.updateTrending = async (req, res) => {
    try {
        const pos_deleted = await cloudinary.api.delete_resources_by_prefix("TrendingPosters/")
        console.log(pos_deleted);
        const car_deleted = await cloudinary.api.delete_resources_by_prefix('TrendingCarousal/')
        console.log(car_deleted);
        await Trending.deleteMany({});
        const trending = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchTrending}`)
        trendingdata = trending.data.results;
        for (let i = 0; i < trendingdata.length; i++) {
            if (trendingdata[i].title || trendingdata[i].name) {
                const data = {
                    tmdb_id: trendingdata[i].id,
                    name: trendingdata[i].title || trendingdata[i].name,
                    overview: trendingdata[i].overview,
                    date_of_release: trendingdata[i].release_date || trendingdata[i].first_air_date,
                    language: trendingdata[i].original_language,
                    avg_votes: trendingdata[i].vote_average,
                }
                if (trendingdata[i].title) {
                    var options = {
                        url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
                        dest: `./PosterUploads/${trendingdata[i].title}.jpg`,
                    }
                } else if (trendingdata[i].name) {
                    var options = {
                        url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
                        dest: `./PosterUploads/${trendingdata[i].name}.jpg`,
                    }
                }
                download.image(options)
                    .then(async ({
                        filename
                    }) => {
                        if (filename) {
                            const img_url = await cloudinary.uploader.upload(filename, {
                                folder: "TrendingPosters/"
                            });
                            data.poster_img = img_url.url
                            var cnt = 1;
                            if (cnt == 1) {
                                const r = await yts(`${data.name} English Dubbed Final Trailer ${data.date_of_release.split("-")[0]}`)
                                const trailer_url = getURL(r.all, data.name)
                                data.trailer_url = trailer_url
                                cnt++;
                            }
                            const trending_data = await new Trending(data);
                            await trending_data.save();
                            carousal_downUp(trending_data._id, trending_data.name, process.env.BACK_IMAGE_URL + trendingdata[i].backdrop_path);
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
        res.send("Updated Trending");
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
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
                    folder: "TrendingCarousal/"
                });
                const data = await Trending.findByIdAndUpdate({
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





exports.getTrending = async (req, res) => {
    // res.send("Trending Get");
    try {
        const allTrending = await Trending.find({});
        if (allTrending.length < 1) {
            throw new Error("No Trending Data");
        } else {
            res.status(200).send(allTrending);
        }
    } catch (error) {
        if (error.message == "No Trending Data") {
            res.status(404).send(error.message)
        }
    }
}