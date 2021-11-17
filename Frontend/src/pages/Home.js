import React, {useEffect} from 'react';
import {useState} from "react";
import Search from "../components/UI/Home/Search";
import MoviesContainer from "../components/Containers/Home/MoviesContainer";
import ReactPaginate from 'react-paginate';
import API from "../services";

const Home = () => {

    const [search, setSearch] = useState({
        searchTerm: '',
        genre: '',
        rating: '',
        year: '2021',
        orderBy: 'popularity.desc'
    });

    const [movies, setMovies] = useState([]);

    const [genres, setGenres] = useState([]);

    const [pageCount, setPageCount] = useState(0);

    const [page, setPage] = useState(1);

    let limit = 20;
    useEffect(() => {
        getMovies();
        // eslint-disable-next-line
    }, [limit, page]);

    useEffect(() => {
        getGenres();
        // eslint-disable-next-line
    }, []);

    const getMovies = async () => {
        const {results, total_results} = await searchMovies();
        setPageCount(Math.ceil(total_results / limit));
        setMovies(results);
    };

    const searchMovies = async () => {
        const {data} = await API.movie.search({
            page: page,
            searchTerm: search.searchTerm,
            year: search.year ? search.year : 2021,
            rating: search.rating,
            orderBy: search.orderBy,
            genre: search.genre,
        })
        return data;
    };

    const getGenres = async () => {
        const {data} = await API.movie.getGenreList();
        console.log("Genres", data.genres);
        setGenres(data.genres)

    }

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

    const handleSearch = async (e) => {
        e.preventDefault();
        await getMovies()
    };

    return (
        <div>
            <Search
                search={search}
                handleSearch={handleSearch}
                handleChange={handleChange}
                genres={genres}
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
