import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import debounce from 'lodash.debounce';

import NavigationBar from './NavigationBar';
import Search from '../Search';
import Checkout from '../Checkout';
import Confirmation from '../Confirmation';

import { State } from '../types'

import styles from './index.module.scss';

const DEBOUNCE_TIMER = 250;

/**
 * Makes a request to the OMDB API and returns the response.
 * This is debounced to handle User input.
 */
const searchMovies = debounce(async (searchTerm: string, dispatch: React.Dispatch<{ type: string, data?: any }>) => {
  try {
    const responseJson = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchTerm}`);
    const response = await responseJson.json();

    console.log('response', response);

    if (response.Response === "False") { // Why is this "False"? Comes from API.
      dispatch({ type: 'SET_ERROR', data: response.Error  });
    } else {
      dispatch({ type: 'SET_SEARCH_RESULTS', data: response.Search });
    }
  } catch(e) {
    // TODO: This isn't the most helpful error, but we can improve into this later.
    dispatch({ type: 'SET_ERROR', data: 'There was an issue searching for movies. Please try again.'  });
  }
}, DEBOUNCE_TIMER);

/**
 * The Search component reducer. This handles all state.
 * - searchTerm: The current search term the user is using to search for movies.
 * - searchResults: The results returned from the OMDB API, based on the user's search term.
 * - errorMessage: The error message to display to the user.
 * - isSearching: Flag to determine if a search is currently in progress.
 * - selectedMovies: The movies the user has chosen to purchase.
 * 
 * Note: We use a reducer because we update many state variables during a single "action". If we were to
 * use independent state variables via "useState()", every action would cause multiple re-renders and we
 * would end up with flashing content.
 */
const initialState = {
  searchTerm: '',
  searchResults: null,
  errorMessage: '',
  isSearching: false,
  selectedMovies: []
};

const reducer = (state: State, action: { type: string, data?: any }) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.data,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.data,
        errorMessage: '',
        isSearching: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        searchResults: null,
        errorMessage: action.data,
        isSearching: false,
      };
    case 'SET_IS_SEARCHING':
      return {
        ...state,
        searchResults: null,
        errorMessage: '',
        isSearching: action.data,
      };
    case 'CLEAR_SEARCH':
      return {
        ...state,
        searchTerm: '',
        searchResults: null,
        errorMessage: '',
        isSearching: false,
      };
    case 'TOGGLE_MOVIE': {
      const { selectedMovies } = state;
      const selectedMovieIds = selectedMovies.map(({ movieId }) => movieId);

      // Remove the Movie from the list.
      if (selectedMovieIds.includes(action.data.movieId)){
        return {
          ...state,
          selectedMovies: selectedMovies.filter(({ movieId }) => movieId !== action.data.movieId)
        };
      }
      // Add the Movie to the list.
      else {
        return {
          ...state,
          selectedMovies: [...selectedMovies, action.data],
        };
      }
    }
    case 'RESET_ALL': 
      return initialState;
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { searchTerm, searchResults, errorMessage, isSearching, selectedMovies } = state as State;

  const isMovieSelected = (movieId: string) => {
    const selectedMovieIds = selectedMovies.map(({ movieId }) => movieId);
    return selectedMovieIds.includes(movieId);
  }

  // When the user searches for a movie, make a request to the OMDB API.
  React.useEffect(() => {
    // Do not make a request when the User does not have a search term inputted.
    if (!searchTerm) {
      dispatch({ type: 'CLEAR_SEARCH' })
    } else {
      dispatch({ type: 'SET_IS_SEARCHING', data: true  });

      searchMovies(searchTerm, dispatch);
    }
  }, [searchTerm]);

  return (
    <Router>
      <div className={styles.container}>
        <nav>
          <NavigationBar showCheckout={selectedMovies.length > 0} />
        </nav>
        <main className={styles.content}>
          <Switch>
            <Route path="/" exact>
              <Search
                searchTerm={searchTerm}
                searchResults={searchResults}
                errorMessage={errorMessage}
                isSearching={isSearching}
                isMovieSelected={isMovieSelected}
                dispatch={dispatch}
              />
            </Route>
            <Route path="/checkout" exact>
              <Checkout selectedMovies={selectedMovies} />
            </Route>
            <Route path="/checkout/confirmation">
              <Confirmation selectedMovies={selectedMovies} dispatch={dispatch} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
