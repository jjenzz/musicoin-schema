const { musicoinFetch } = require('./utils/musicoinFetch');
const { coinMarketCapFetch } = require('./utils/coinMarketCapFetch');

function stats() {
	const totalReleases = musicoinFetch('/totalreleases');
	const totalPlays = musicoinFetch('/totalplays');
	const totalArtists = musicoinFetch('/totalartists');
	const ticker = coinMarketCapFetch('/ticker/musicoin');

	return Promise.all([totalReleases, totalPlays, totalArtists, ticker])
		.then(results => results.map(result => result.json()))
		.then(([totalReleases, totalPlays, totalArtists, ticker]) => ({
			priceUsd: ticker.then(result => Number(result[0].price_usd)),
			totalReleases,
			totalPlays,
			totalArtists,
		}));
}

module.exports = {
	stats,
};
