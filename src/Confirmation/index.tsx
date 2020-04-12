import React from 'react';

import { Link } from 'react-router-dom';

import styles from './Confirmation.module.scss';

type Props = {
  selectedMovies: {
    movieId: string;
    thumbnailSrc: string;
    year: string;
    title: string;
  }[],
  dispatch: React.Dispatch<{ type: string, data?: any }>;
}

const Confirmation = ({ selectedMovies, dispatch }: Props) => {
  React.useEffect(() => {
    return () => {
      // Clear the previous purchase flow.
      dispatch({ type: 'RESET_ALL' })
    }
  }, [dispatch]);

  if (selectedMovies.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>
          You have not purchased any movies.
        </h1>  
        <p>
          Try searching for movies on the home page.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Congratulations!</h1>
      <p className={styles.description}>You've purchased { selectedMovies.map(({ title }, index) => (<span>{index === 0 ? '' : ', '}{title}</span>))}.</p>
      <p>Want to purchase more movies? <Link to="/">Click here.</Link></p>
    </div>
  );
};

export default Confirmation;