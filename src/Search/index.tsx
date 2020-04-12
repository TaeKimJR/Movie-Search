import React from 'react';

import MovieRow from '../shared/MovieRow';

import { Movie } from '../types';

import styles from './index.module.scss';

type Props = {
  searchTerm: string;
  errorMessage: string;
  isSearching: boolean;
  searchResults: Movie[] | null;
  isMovieSelected: (movieId: string) => boolean;
  dispatch: React.Dispatch<{ type: string, data?: any }>;
}

// TODO: Update URL with search term query.
const Search = ({ searchTerm, errorMessage, isSearching, searchResults, isMovieSelected, dispatch }: Props) => {

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="e.g. Citizen Cane"
          aria-label="Search for a movie"
          value={searchTerm}
          onChange={(e) => {
            dispatch({ type: 'SET_SEARCH_TERM', data: e.target.value  });
          }}
        />
      </div>

      <div className={styles.resultsContainer}>
        {
          isSearching && (
            <div className={styles.loading}>
              <img src="https://miro.medium.com/max/882/1*8NJgObmgEVhNWVt3poeTaA.gif" alt="loading" />
            </div>
          )
        }

        {
          errorMessage && (
            <p className={styles.errorMessage}>
              {errorMessage}
            </p>
          )
        }

        {
          !searchTerm && (
            <p className={styles.infoMessage}>
              Try searching for "Citizen Kane".
            </p>
          )
        }
        
        {
          !errorMessage && searchTerm && !isSearching && searchResults && (
            <div className={styles.searchResults}>
              {
                searchResults.map(({ Title, Poster, Year, imdbID }) => (
                  <MovieRow
                    onClick={(movie) => { dispatch({ type: 'TOGGLE_MOVIE', data: movie })}}
                    isSelected={isMovieSelected(imdbID)}
                    title={Title}
                    thumbnailSrc={Poster}
                    year={Year}
                    movieId={imdbID}
                  />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
};

export default Search;