import { useState } from 'react';
import type { ComponentType } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/movieService';
import css from './App.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
  });

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelectMovie = (movieId: number): void => {
    setSelectedMovieId(movieId);
  };

  const handleCloseModal = (): void => {
    setSelectedMovieId(null);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Movie search</h1>
      <SearchBar onSubmit={handleSearch} />

      {isPending && query !== '' && <Loader />}
      {isError && (
        <ErrorMessage message="Something went wrong while fetching movies. Please try again." />
      )}
      {isSuccess && movies.length === 0 && (
        <ErrorMessage message="No movies found for your request." />
      )}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {selectedMovieId !== null && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
