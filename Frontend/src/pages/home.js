import React from 'react';
import {useState} from "react";
import Search from "../components/UI/Home/Search";
import MoviesContainer from "../components/Containers/Home/MoviesContainer";

const Home = () => {

    const [search, setSearch] = useState({
        searchTerm: '',
        genre: '',
        rating: '',
        year: '',
        orderBy: ''
    });

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

    return (
        <div>
            <Search
                search={search}
                handleSearch={handleSearch}
                handleChange={handleChange}
            />
            <MoviesContainer />
        </div>
    );
};

export default Home;
