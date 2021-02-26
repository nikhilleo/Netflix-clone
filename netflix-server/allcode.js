// require("dotenv").config();
// require("../netflix-server/Database/database");
// const express = require('express');
// const app = express();
// const morgan = require("morgan");
// const port = process.env.PORT
// const Axios = require("axios");
// const download = require('image-downloader')
// const Trending = require("./models/trending");
// const cloudinary = require('cloudinary').v2;
// var trendingdata = [];
// const yts = require('yt-search')
// const fs = require("fs");
// const {
//     SSL_OP_SSLEAY_080_CLIENT_DH_BUG
// } = require("constants");
// const {
//     title
// } = require("process");

// cloudinary.config({
//     cloud_name: 'uccrgo5202',
//     api_key: '448152779933652',
//     api_secret: 'cYf_aqrJ75P1eIGAHu9a3uyOYCE'
// });

// app.use(morgan("dev"));

// app.get('/', async (req, res) => {
//     cloudinary.api.delete_resources_by_prefix("TrendingPosters/", function (re) {
//         // console.log(res);
//     });
//     cloudinary.api.delete_resources_by_prefix("TrendingCarousal/", function (re) {
//         // console.log(res);
//     });
//     await Trending.remove({});
//     const trending = await Axios.get(`${process.env.TMDB_BASE_URL}${process.env.fetchTrending}`)
//     trendingdata = trending.data.results;
//     for (let i = 0; i < trendingdata.length; i++) {
//         if (trendingdata[i].title || trendingdata[i].name) {
//             const data = {
//                 tmdb_id: trendingdata[i].id,
//                 name: trendingdata[i].title || trendingdata[i].name,
//                 overview: trendingdata[i].overview,
//                 date_of_release: trendingdata[i].release_date || trendingdata[i].first_air_date,
//                 language: trendingdata[i].original_language,
//                 avg_votes: trendingdata[i].vote_average,
//             }
//             if (trendingdata[i].title) {
//                 var options = {
//                     url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
//                     dest: `./PosterUploads/${trendingdata[i].title}.jpg`,
//                 }
//             } else if (trendingdata[i].name) {
//                 var options = {
//                     url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
//                     dest: `./PosterUploads/${trendingdata[i].name}.jpg`,
//                 }
//             }
//             download.image(options)
//                 .then(async ({
//                     filename
//                 }) => {
//                     // console.log(filename);
//                     if (filename) {
//                         // await console.log('Saved to', filename) // saved to /path/to/dest/photo.jpg
//                         const img_url = await cloudinary.uploader.upload(filename, {
//                             folder: "TrendingPosters/"
//                         });
//                         // await console.log(img_url);
//                         data.poster_img = img_url.url
//                         // console.log(data.date_of_release.split("-")[0]);
//                         var cnt = 1;
//                         if (cnt == 1) {
//                             const r = await yts(`${data.name} English Dubbed Final Trailer ${data.date_of_release.split("-")[0]}`)
//                             const trailer_url = getURL(r.all, data.name)
//                             data.trailer_url = trailer_url
//                             cnt++;
//                         }
//                         // console.log(data) 
//                         const trending_data = await new Trending(data);
//                         await trending_data.save();
//                         carousal_downUp(trending_data._id, trending_data.name, process.env.BACK_IMAGE_URL + trendingdata[i].backdrop_path);
//                         fs.unlink(filename, (err) => {
//                             if (err) console.log(err)
//                             // else
//                             // console.log(`Deleted file: ${filename}`); 
//                         });
//                     }
//                 })
//                 .catch((err) => console.log(err))
//         }
//         //Carousal Images Uploading
//         // if(trendingdata[i].name)
//         // {
//         //     const data = {
//         //         tmdb_id : trendingdata[i].id,
//         //         name : trendingdata[i].name,
//         //         overview : trendingdata[i].overview,
//         //         date_of_release:trendingdata[i].first_air_date,
//         //         language:trendingdata[i].original_language,
//         //         avg_votes:trendingdata[i].vote_average,
//         //         // carousal_img:process.env.BACK_IMAGE_URL + trendingdata[i].backdrop_path,
//         //         // poster_img:process.env.BACK_IMAGE_URL + trendingdata[i].poster_path
//         //     }
//         //     console.log(data);
//         //     const options = {
//         //         url: process.env.BACK_IMAGE_URL + trendingdata[i].poster_path,
//         //         dest: `./PosterUploads/${trendingdata[i].name}.jpg`
//         //     }
//         //     download.image(options)
//         //     .then(async({filename}) => {
//         //         if(filename)
//         //         {
//         //             // await console.log('Saved to', filename) // saved to /path/to/dest/photo.jpg
//         //             const img_url = await cloudinary.uploader.upload(filename,{folder : "TrendingPosters/"});
//         //             // await console.log(img_url);
//         //             data.poster_img = img_url.url
//         //             // console.log(data);
//         //             const trending_data = await new Trending(data);
//         //             await trending_data.save();
//         //             fs.unlink(filename,(err)=>{
//         //                 if(err) console.log(err)
//         //                 else
//         //                 console.log(`Deleted file: ${filename}`); 
//         //             });
//         //         }
//         //     })
//         //     .catch((err) => console.log(err))
//         // }
//     }
//     res.send("Updated Trending");
// });;

// function carousal_downUp(id, name, url) {
//     // console.log(id)
//     // console.log(name)
//     // console.log(url)
//     const options = {
//         url: url,
//         dest: `./CarousalUploads/${name}.jpg`,
//     }
//     download.image(options)
//         .then(async ({
//             filename
//         }) => {
//             if (filename) {
//                 // console.log(filename)
//                 const img_url = await cloudinary.uploader.upload(filename, {
//                     folder: "TrendingCarousal/"
//                 });
//                 const data = await Trending.findByIdAndUpdate({
//                     _id: id
//                 }, {
//                     carousal_img: img_url.url
//                 });
//                 // console.log(data);
//                 fs.unlink(filename, (err) => {
//                     if (err) console.log(err)
//                     // else
//                     // console.log(`Deleted file: ${filename}`); 
//                 });
//             }

//         })
//     //     .then(async ({
//     //         filename
//     //     }) => {
//     //         // console.log(filename);
//     //         if (filename) {
//     //             if (trendingdata[i].title) {
//     //                 const name = await trendingdata[i].title;
//     //                 // await console.log("In IF", name)
//     //                 const img_url = await cloudinary.uploader.upload(filename, {
//     //                     folder: "TrendingPosters/"
//     //                 });
//     //                 // await console.log(img_url);
//     //                 // data.poster_img = img_url.url
//     //                 // console.log(data);
//     //                 if(img_url.url)
//     //                 {
//     //                     const trending_data1 = await Trending.findOne({name: name});
//     //                     trending_data1.carousal_img = img_url.url;
//     //                     await trending_data1.save();
//     //                     fs.unlink(filename, (err) => {
//     //                         if (err) console.log(err)
//     //                         // else
//     //                         // console.log(`Deleted file: ${filename}`); 
//     //                     });
//     //                 }
//     //                 // console.log(trending_data);
//     //             } 
//     // if (trendingdata[i].title || trendingdata[i].name) {
//     //     if (trendingdata[i].title) {
//     //         var options1 = {
//     //             url: process.env.BACK_IMAGE_URL + trendingdata[i].backdrop_path,
//     //             dest: `./CarousalUploads/${trendingdata[i].title}.jpg`,
//     //         }
//     //     } else if (trendingdata[i].name) {
//     //         var options1 = {
//     //             url: process.env.BACK_IMAGE_URL + trendingdata[i].backdrop_path,
//     //             dest: `./CarousalUploads/${trendingdata[i].name}.jpg`,
//     //         }
//     //     }
//     // }
//     // download.image(options1)
//     //     .then(async ({
//     //         filename
//     //     }) => {
//     //         // console.log(filename);
//     //         if (filename) {
//     //             if (trendingdata[i].title) {
//     //                 const name = await trendingdata[i].title;
//     //                 // await console.log("In IF", name)
//     //                 const img_url = await cloudinary.uploader.upload(filename, {
//     //                     folder: "TrendingPosters/"
//     //                 });
//     //                 // await console.log(img_url);
//     //                 // data.poster_img = img_url.url
//     //                 // console.log(data);
//     //                 if(img_url.url)
//     //                 {
//     //                     const trending_data1 = await Trending.findOne({name: name});
//     //                     trending_data1.carousal_img = img_url.url;
//     //                     await trending_data1.save();
//     //                     fs.unlink(filename, (err) => {
//     //                         if (err) console.log(err)
//     //                         // else
//     //                         // console.log(`Deleted file: ${filename}`); 
//     //                     });
//     //                 }
//     //                 // console.log(trending_data);
//     //             } 
//     //             else if (trendingdata[i].name) 
//     //             {
//     //                 const name = trendingdata[i].name;
//     //                 // console.log("In Else IF", name)
//     //                 const img_url = await cloudinary.uploader.upload(filename, {
//     //                     folder: "TrendingPosters/"
//     //                 });
//     //                 if(img_url.url)
//     //                 {
//     //                     const trending_data1 = await Trending.findOne({name: name});
//     //                     trending_data1.carousal_img = img_url.url;
//     //                     await trending_data1.save();
//     //                     fs.unlink(filename, (err) => {
//     //                         if (err) console.log(err)
//     //                         // else
//     //                         // console.log(`Deleted file: ${filename}`); 
//     //                     });
//     //                 }
//     //                 // await console.log(img_url);
//     //                 // data.poster_img = img_url.url
//     //                 // console.log(data);
//     //                 // console.log(trending_data);
//     //             }
//     //             // console.log(name)
//     //             // await console.log('Saved to', filename) // saved to /path/to/dest/photo.jpg

//     //         }
//     //     })
//     //     .catch((err) => console.log(err))
// }


// function getURL(data, name1) {
//     // console.log(data);
//     var flag = 0;
//     var goodLinks = []
//     const name = name1.toLowerCase()
//     for (let i = 0; i < data.length; i++) {
//         // console.log("\n\n\n\n\n\n\n")
//         // console.log(data[i])
//         var title = data[i].title.toLowerCase();
//         if (title.includes(":")) {
//             title.replace(":", "");
//         }
//         if (title.includes(`${name}`) && title.includes("official") && data[i].seconds < 180) {
//             // goodLinks.push[data[i]];
//             goodLinks.push(data[i].url);
//         } else if (flag == 0) {
//             console.log(title);
//         }
//     }
//     if (goodLinks.length < 1) {
//         console.log(data);
//         for (let i = 0; i < data.length; i++) {
//             if (title.includes(":")) {
//                 title.replace(":", "");
//             }
//             if (title.includes(`${name}`) && title.includes("official") && data[i].seconds < 300) {
//                 // goodLinks.push[data[i]];
//                 goodLinks.push(data[i].url);
//             } else if (flag == 0) {
//                 console.log(title);
//             }
//         }
//     }
//     console.log("\n\n", goodLinks);
//     return goodLinks;
// }

// app.listen(port, () => {
//     console.log(`Server started http://localhost:${port}`);
// });