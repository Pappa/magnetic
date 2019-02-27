const fetch = require('node-fetch');

const mapMovie = movie => ({
  title: movie.title,
  year: movie.year,
  rating: movie.rating,
  torrents: movie.torrents
})

module.exports.hello = async (event, context) => {
  const response = await fetch(`https://yts.am/api/v2/list_movies.json?limit=10&query_term=${event}`)
    .then(res => res.json())
  return {
    statusCode: 200,
    body: Object.assign({}, response.data, { movies: response.data.movies.map(mapMovie) }),
    event: event
  };
};
