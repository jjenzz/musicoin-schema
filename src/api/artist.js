const { request } = require('./utils/request');

module.exports.artist = (_, { id }) => {
	return request(`/artist/profile/${id}`).then(res => res.json());
};

module.exports.allArtists = () => {
	return request('/artists')
		.then(res => res.json())
		.then(res => ({
			count: res.nodes.length,
			nodes: res.nodes,
		}));
};
