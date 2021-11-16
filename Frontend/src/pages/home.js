import React, {useEffect} from 'react';
import {useState} from "react";
import Search from "../components/UI/Home/Search";
import MoviesContainer from "../components/Containers/Home/MoviesContainer";
import movie from "../services/movie.api";
import ReactPaginate from 'react-paginate';

const Home = () => {

    const [search, setSearch] = useState({
        searchTerm: '',
        genre: '',
        rating: '',
        year: '',
        orderBy: ''
    });

    const [movies, setMovies] = useState([]);

    const [pageCount, setPageCount] = useState(0);

    const [page, setPage] = useState(1);

    let limit = 20;
    useEffect(() => {
        const getMovies = async () => {
            const {results, total_results} = await fetchMovies(page);
            setPageCount(Math.ceil(total_results / limit));
            setMovies(results);
        };

        getMovies();
    }, [limit, page]);

    const fetchMovies = async (currentPage) => {
        const {data} = await movie.popularMovies(currentPage)
        return data;
    };

    const handlePageClick = async ({selected}) => {
        let currentPage = selected + 1;
        setPage(currentPage);
    };

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
            {movies.length
                ? <MoviesContainer movies={movies}/>
                : <div className="text-center">Loading...</div>}
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};

export default Home;
