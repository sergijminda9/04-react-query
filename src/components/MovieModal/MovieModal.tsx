import { useEffect } from 'react';
import type { MouseEvent, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from '../../services/movieService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const NO_POSTER_LABEL = 'No poster';

function MovieModal({ movieId, onClose }: MovieModalProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleBackdropKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="button"
      tabIndex={-1}
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
    >
      <div className={css.modal} role="dialog" aria-modal="true">
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {isPending && <Loader />}
        {isError && <ErrorMessage message="Failed to load movie details." />}

        {data && (
          <div className={css.content}>
            {data.poster_path ? (
              <img
                className={css.poster}
                src={`${IMAGE_BASE_URL}${data.poster_path}`}
                alt={data.title}
              />
            ) : (
              <div className={css.noPoster}>{NO_POSTER_LABEL}</div>
            )}
            <div className={css.details}>
              <h2 className={css.title}>{data.title}</h2>
              {data.tagline && <p className={css.tagline}>{data.tagline}</p>}
              <p className={css.overview}>{data.overview}</p>
              <ul className={css.meta}>
                <li>
                  <strong>Release date:</strong> {data.release_date || 'N/A'}
                </li>
                <li>
                  <strong>Rating:</strong> {data.vote_average.toFixed(1)} / 10
                </li>
                <li>
                  <strong>Runtime:</strong>{' '}
                  {data.runtime ? `${data.runtime} min` : 'N/A'}
                </li>
                <li>
                  <strong>Genres:</strong>{' '}
                  {data.genres.length > 0
                    ? data.genres.map((genre) => genre.name).join(', ')
                    : 'N/A'}
                </li>
                <li>
                  <strong>Budget:</strong>{' '}
                  {data.budget ? `$${data.budget.toLocaleString()}` : 'N/A'}
                </li>
                <li>
                  <strong>Status:</strong> {data.status}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default MovieModal;
