import type { MouseEvent, KeyboardEvent } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';
const NO_BACKDROP_LABEL = 'No image';

function MovieModal({ movie, onClose }: MovieModalProps) {
  const { title, overview, backdrop_path, release_date, vote_average } = movie;

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

        {backdrop_path ? (
          <img
            className={css.backdropImage}
            src={`${IMAGE_BASE_URL}${backdrop_path}`}
            alt={title}
          />
        ) : (
          <div className={css.noBackdrop}>{NO_BACKDROP_LABEL}</div>
        )}

        <div className={css.content}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.overview}>{overview}</p>
          <ul className={css.meta}>
            <li>
              <strong>Release date:</strong> {release_date || 'N/A'}
            </li>
            <li>
              <strong>Rating:</strong> {vote_average.toFixed(1)} / 10
            </li>
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default MovieModal;
