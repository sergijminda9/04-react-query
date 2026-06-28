import type { Movie } from '../../types/movie';
import css from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';
const NO_POSTER_LABEL = 'No poster';

function MovieCard({ movie }: MovieCardProps) {
  const { title, poster_path, release_date, vote_average, overview } = movie;

  const releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';

  return (
    <li className={css.card}>
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
        <p className={css.overview}>
          {overview || 'No description available.'}
        </p>
      </div>
    </li>
  );
}

export default MovieCard;
