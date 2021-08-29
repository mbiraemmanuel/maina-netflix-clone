import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer'

const base_URL = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}){
    const [movies, setMovies] = useState([]);
    const [trailerURl, setTrailerURl] = useState("");

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData()
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }
    
    const handleClick = (movie) => {
        if(trailerURl){
            setTrailerURl('')
        } else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                console.log(new URL(url).search)
                const urlParams  = new URLSearchParams( new URL(url).search );
                console.log(urlParams)
                setTrailerURl(urlParams.get("v"))

            })
            .catch((error) => console.error(error));
        }
    }

    return (
        <div className="row">
            <h2 className="row_title">{title}</h2>
        <div className="row_posters">
            {movies.map(movie=>(
                <img 
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge" }`}
                src={`${base_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
            ))}
        </div>
        { trailerURl && <YouTube videoId={trailerURl} opts={opts}/>}

        </div>
    )
}

export default Row;