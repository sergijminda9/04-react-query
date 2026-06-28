import { useState } from 'react';
import type { ComponentType } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import SearchForm from '../SearchForm/SearchForm';
import MovieList from '../MovieList/MovieList';
import { fetchMovies } from '../../services/movies';
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

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
  });

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Movie search</h1>
      <SearchForm onSubmit={handleSearch} />

      {isPending && query !== '' && <p className={css.message}>Loading...</p>}
      {isError && (
        <p className={css.message}>
          Something went wrong while fetching movies. Please try again.
        </p>
      )}
      {isSuccess && movies.length === 0 && (
        <p className={css.message}>No movies found for your request.</p>
      )}

      {movies.length > 0 && <MovieList movies={movies} />}

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
    </div>
  );
}

export default App;
