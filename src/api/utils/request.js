const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'production') {
	console.log('load env');
	require('dotenv').load();
}

const uri = 'https://api.musicoin.org';
const clientId = process.env.MUSICOIN_CLIENT_ID;

module.exports.request = resource => {
	return fetch(`${uri}${resource}`, {
		headers: {
			clientId,
		},
	});
};
