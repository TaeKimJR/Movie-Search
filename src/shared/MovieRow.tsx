import React from 'react';
import cns from 'classnames';

import styles from './MovieRow.module.scss';

type Props = {
  onClick?: (movie: {
    movieId: string;
    thumbnailSrc: string;
    year: string;
    title: string;
  }) => void;
  isSelected?: boolean;
  thumbnailSrc: string;
  title: string;
  year: string;
  movieId: string;
}

/**
 * Displays a Movie.
 */
const MovieRow = ({ onClick, isSelected, thumbnailSrc, title, year, movieId }: Props) => {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      className={cns(styles.movieRow, isSelected && styles.movieRow_selected )}
      onClick={() => {
        if (onClick) {
          onClick({ movieId, title, year, thumbnailSrc })
        }
      }}
    >
      <div className={styles.movieThumbnail}>
        <img src={thumbnailSrc} alt={`${title} Thumbnail`} />
      </div>
      <div className={styles.movieContent}>
        <h2 className={styles.movieTitle}>{title}</h2>
        <div className={styles.movieDescription}>
          <span>{year}</span>
        </div>
      </div>
    </Wrapper>
  )
};

export default MovieRow;