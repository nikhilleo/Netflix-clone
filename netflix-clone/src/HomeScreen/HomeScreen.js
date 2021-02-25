import React from 'react'
import Banner from "../Banner/Banner"
import "./HomeScreen.css"
import Nav from '../Nav/Nav'
import Rows from "../Row/Rows"
import requests from "../Request";

function HomeScreen() {
    return (
        <div className="homeScreen">
            <Nav/>
            <Banner/> 
            <Rows
                title="Netflix Originals"
                fetchURL={requests.fetchNetflixOriginals}
                isLarge={true}
            />
            <Rows
                title="Top Rated"
                fetchURL={requests.fetchTopRated}
                // isLarge={true}
            />
            <Rows
                title="Trending"
                fetchURL={requests.fetchTrending}
                // isLarge={true}
            />
            <Rows
                title="Comedy"
                fetchURL={requests.fetchComedy}
                // isLarge={true}
            />
            <Rows
                title="Action"
                fetchURL={requests.fetchActionMovies}
                // isLarge={true}
            />
            <Rows
                title="Horror"
                fetchURL={requests.fetchHorror}
                // isLarge={true}
            />
            <Rows
                title="Romance"
                fetchURL={requests.fetchRomance}
                // isLarge={true}
            />
            <Rows
                title="Documentaries"
                fetchURL={requests.fetchDocs}
                // isLarge={true}
            />
        </div>
    )
}

export default HomeScreen
