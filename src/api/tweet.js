const fetch = require('node-fetch');
const { twitterFetch } = require('./utils/twitterFetch');

function search(_, params) {
	const {
		query,
		resultType = 'recent',
		includeEntities = false,
		count = 3,
	} = params;

	return twitterFetch('search/tweets', {
		q: query,
		count,
		result_type: resultType,
		include_entities: includeEntities,
	});
}

function tweets(_, params) {
	return search(null, params)
		.then(search => search.statuses.map(getTweetUrl))
		.then(urls => urls.map(encodeURIComponent))
		.then(urls => urls.map(fetchTweetEmbed))
		.then(urls => urls.map(res => res.then(res => res.json())));
}

function getTweetUrl({ id_str, user }) {
	return `https://twitter.com/${user.screen_name}/status/${id_str}`;
}

function fetchTweetEmbed(url) {
	const uri = 'https://publish.twitter.com/oembed';
	return fetch(`${uri}?url=${url}&hide_thread=true&hide_media=true`);
}

module.exports = {
	tweets,
};
