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
        year: '2021',
        orderBy: ''
    });

    const [movies, setMovies] = useState([]);

    const [pageCount, setPageCount] = useState(0);

    const [page, setPage] = useState(1);

    const [isSearch, setIsSearch] = useState(false);

    let limit = 20;
    useEffect(() => {
        const getMovies = async () => {
            const {results, total_results} = isSearch ? await searchMovies() : await fetchMovies(page);
            setPageCount(Math.ceil(total_results / limit));
            setMovies(results);
        };

        getMovies();
        // eslint-disable-next-line
    }, [limit, page, isSearch]);

    const fetchMovies = async (currentPage) => {
        const {data} = await movie.popularMovies(currentPage)
        return data;
    };

    const searchMovies = async () => {
        const {data} = await movie.search({
            page: page,
            searchTerm: search.searchTerm,
            year: search.year ? search.year : 2021
        })
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
        setIsSearch(true);
    };

    return (
        <div>
            <Search
                search={search}
                handleSearch={handleSearch}
                handleChange={handleChange}
            />
            <div className=" mt-3 d-flex justify-content-center">
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
            {movies.length
                ? <MoviesContainer movies={movies}/>
                : <div className="text-center">Loading...</div>}
        </div>
    );
};

export default Home;
