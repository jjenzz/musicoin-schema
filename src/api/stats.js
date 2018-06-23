const { musicoinFetch } = require('./utils/musicoinFetch');
const { coinMarketCapFetch } = require('./utils/coinMarketCapFetch');
const fetch = require('node-fetch');

const uri = 'https://staging.musicoin.org';

const Stats = {
	totalArtists: () => {
		return fetch(`${uri}/totalartists`)
			.then(response => response.text())
			.then(Number);
	},
	totalPlays: () => {
		return fetch(`${uri}/totalplays`)
			.then(response => response.text())
			.then(Number);
	},
	totalReleases: () => {
		return fetch(`${uri}/totalreleases`)
			.then(response => response.text())
			.then(Number);
	},
	priceUsd: () => {
		return coinMarketCapFetch('/ticker/musicoin')
			.then(response => response.json())
			.then(response => response[0].price_usd)
			.then(Number);
	},
};

module.exports = Stats;
