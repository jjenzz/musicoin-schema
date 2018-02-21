const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

const uri = 'https://musicoin.org/json-api';
const clientId = process.env.MUSICOIN_CLIENT_ID;

module.exports.request = resource => {
	return fetch(`${uri}${resource}`, { headers: { clientId } });
};
