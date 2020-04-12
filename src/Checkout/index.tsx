import React from 'react';
import { Link } from 'react-router-dom';

import MovieRow from '../shared/MovieRow';

import styles from './Checkout.module.scss';

type Props = {
  selectedMovies: {
    movieId: string;
    thumbnailSrc: string;
    year: string;
    title: string;
  }[],
}

const Checkout = ({ selectedMovies }: Props) => {
  if (selectedMovies.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>
          You have not selected any movies.
        </h1>  
        <p>
          Try searching for movies on the home page.
        </p>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Purchase your movies
      </h1>  
      <div className={styles.moviesContainer}>
        {
          selectedMovies.map(({
            thumbnailSrc,
            year,
            movieId,
            title,
          }) => (
            <MovieRow 
              thumbnailSrc={thumbnailSrc}
              year={year}
              movieId={movieId}
              title={title}
            />
          ))
        }
      </div>
      <div className={styles.footer}>
        <Link className={styles.purchaseButton} to="/checkout/confirmation">Purchase</Link>
      </div>
    </div>
  ) 
};

export default Checkout;