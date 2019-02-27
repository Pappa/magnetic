const fetch = require('node-fetch');

const mapMovie = movie => ({
  title: movie.title,
  year: movie.year,
  rating: movie.rating,
  torrents: movie.torrents
})

module.exports.hello = async (event, context) => {
  const term = (event && event.query) ? event.query.term : "movie";
  const response = await fetch(`https://yts.am/api/v2/list_movies.json?limit=10&query_term=${term}`)
    .then(res => res.json())
  return {
    statusCode: 200,
    body: Object.assign({}, response.data, { movies: (response && response.data && response.data.movies) ? response.data.movies.map(mapMovie) : [] }),
    term: term
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

