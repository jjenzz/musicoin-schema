const { request } = require('./utils/request');

module.exports.allReleases = () => {
	return request('/releases')
		.then(res => res.json())
		.then(res => ({
			count: res.nodes.length,
			totalPlays: res.nodes.reduce((acc, node) => acc + node.plays, 0),
			nodes: res.nodes,
		}));
};
