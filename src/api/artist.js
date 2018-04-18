const { request } = require('./utils/request');

function artist(_, { id }) {
	return request(`/json-api/artist/${id}`)
		.then(res => res.json())
		.then(({ artist, releases }) => Object.assign({}, artist, { releases }));
}

function featuredArtists() {
	return request(`/json-api/artists/featured`)
		.then(res => res.json())
		.then(artists => artists.map(({ profileAddress }) => profileAddress))
		.then(ids => ids.map(id => artist(null, { id })));
}

module.exports = {
	artist,
	featuredArtists,
};
