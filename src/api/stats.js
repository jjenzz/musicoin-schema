const { request } = require('./utils/request');

function stats() {
	const totalReleases = request('/totalreleases');
	const totalPlays = request('/totalplays');
	const totalArtists = request('/totalartists');

	return Promise.all([totalReleases, totalPlays, totalArtists])
		.then(results => results.map(result => result.json()))
		.then(([totalReleases, totalPlays, totalArtists]) => ({
			totalReleases,
			totalPlays,
			totalArtists,
		}));
}

module.exports = {
	stats,
};
