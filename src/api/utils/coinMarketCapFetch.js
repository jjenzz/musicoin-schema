const fetch = require('node-fetch');
const uri = 'https://api.coinmarketcap.com/v1';

module.exports.coinMarketCapFetch = resource => fetch(`${uri}${resource}`);
