import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movieId: number) => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';
const NO_POSTER_LABEL = 'No poster';

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(({ id, title, poster_path, release_date, vote_average }) => {
        const releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';

        return (
          <li key={id} className={css.item}>
            <button
              type="button"
              className={css.card}
              onClick={() => onSelect(id)}
            >
              {poster_path ? (
                <img
                  className={css.poster}
                  src={`${IMAGE_BASE_URL}${poster_path}`}
                  alt={title}
                  loading="lazy"
                />
              ) : (
                <div className={css.noPoster}>{NO_POSTER_LABEL}</div>
              )}
              <div className={css.info}>
                <h2 className={css.title}>
                  {title} <span className={css.year}>({releaseYear})</span>
                </h2>
                <p className={css.rating}>⭐ {vote_average.toFixed(1)}</p>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieGrid;
