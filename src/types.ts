export type State = {
  searchTerm: string;
  searchResults: Movie[] | null;
  errorMessage: string;
  isSearching: boolean;
  selectedMovies: {
    movieId: string;
    thumbnailSrc: string;
    year: string;
    title: string;
  }[];
}

// TODO: Do the conversion to our movie type when we receive movies from API.
export type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}