const { musicoinFetch } = require('./utils/musicoinFetch');

function artist(_, { id }) {
	return musicoinFetch(`/json-api/artist/${id}`)
		.then(res => res.json())
		.then(({ artist, releases }) => Object.assign({}, artist, { releases }));
}

function featuredArtists() {
	return musicoinFetch(`/json-api/artists/featured`)
		.then(res => res.json())
		.then(artists => artists.map(({ profileAddress }) => profileAddress))
		.then(ids => ids.map(id => artist(null, { id })));
}

module.exports = {
	artist,
	featuredArtists,
};
