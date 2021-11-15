import React, {useEffect} from 'react';
import {useState} from "react";
import Search from "../components/UI/Home/Search";
import MoviesContainer from "../components/Containers/Home/MoviesContainer";
import movie from "../services/movie.api";

const Home = () => {

    const [search, setSearch] = useState({
        searchTerm: '',
        genre: '',
        rating: '',
        year: '',
        orderBy: ''
    });

    const [page, setPage] = useState(1);

    const [paginationDetails, setPaginationDetails] = useState({totalPages: 0, totalMovies: 0});

    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        setMovies();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        const payload = {...search};
        payload[name] = value;
        setSearch(payload);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Handle search submit");
    };

    const setMovies = async () => {
        await movie.popularMovies(page)
            .then(res => {
                const {data} = res;
                setPopularMovies(data.results);
                setPaginationInformation(data);
            })
            .catch(e => e.success)
    };

    const setPaginationInformation = (payload) => {
        const pagination = {...paginationDetails};
        pagination.totalPages = payload.data.total_pages;
        pagination.totalMovies = payload.data.total_results;
        setPaginationDetails(pagination);
    };

    return (
        <div>
            <Search
                search={search}
                handleSearch={handleSearch}
                handleChange={handleChange}
            />
            {popularMovies.length
                ? <MoviesContainer movies={popularMovies}/>
                : <div className="text-center">Loading...</div>}
        </div>
    );
};

export default Home;
